import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Clock,
  CheckCircle,
  Lock,
  Play,
  ArrowRight,
  CaretDown,
} from "@phosphor-icons/react/dist/ssr";
import {
  formatPrice,
  getLevelLabel,
  formatDuration,
} from "@/lib/utils";
import { PurchaseButton } from "./purchase-button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = await prisma.course.findUnique({
    where: { slug: courseId },
    select: { title: true, description: true },
  });
  return {
    title: course?.title ?? "Course",
    description: course?.description,
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const session = await auth();

  const course = await prisma.course.findUnique({
    where: { slug: courseId, isPublished: true },
    include: {
      chapters: {
        orderBy: { position: "asc" },
        include: {
          lessons: {
            orderBy: { position: "asc" },
            select: {
              id: true,
              title: true,
              duration: true,
              isFree: true,
              position: true,
            },
          },
        },
      },
    },
  });

  if (!course) notFound();

  const purchased = session?.user?.id
    ? !!(await prisma.purchase.findUnique({
        where: {
          userId_courseId: {
            userId: session.user.id,
            courseId: course.id,
          },
        },
      }))
    : false;

  const totalLessons = course.chapters.reduce(
    (acc, ch) => acc + ch.lessons.length,
    0
  );
  const totalDuration = course.chapters.reduce(
    (acc, ch) =>
      acc + ch.lessons.reduce((a, l) => a + (l.duration ?? 0), 0),
    0
  );

  const firstLesson = course.chapters[0]?.lessons[0];

  const levelVariantMap: Record<string, "teal" | "blue" | "purple"> = {
    BEGINNER: "teal",
    INTERMEDIATE: "blue",
    ADVANCED: "purple",
  };

  return (
    <div className="min-h-[100dvh] pt-20">
      {/* Course Hero */}
      <div className="bg-ink text-page py-16 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Left: Info */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant={levelVariantMap[course.level] ?? "default"}>
                  {getLevelLabel(course.level)}
                </Badge>
              </div>
              <h1 className="font-serif font-bold text-4xl sm:text-5xl text-page mb-4 leading-tight">
                {course.title}
              </h1>
              <p className="text-page/70 text-lg leading-relaxed mb-6 max-w-xl">
                {course.description}
              </p>
              <div className="flex flex-wrap items-center gap-5 text-sm text-page/60 font-mono">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  {totalLessons} lessons
                </span>
                {totalDuration > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {formatDuration(totalDuration)} total
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  {course.chapters.length} chapters
                </span>
              </div>
            </div>

            {/* Right: Purchase card */}
            <div className="lg:col-span-2">
              <div className="bg-page rounded-2xl border border-rule overflow-hidden shadow-2xl">
                {course.thumbnail && (
                  <div className="relative aspect-video">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="font-serif font-bold text-3xl text-ink">
                      {course.price === 0
                        ? "Free"
                        : formatPrice(course.price, course.currency)}
                    </span>
                    {course.price > 0 && (
                      <span className="text-sm text-ink-subtle font-mono">
                        one-time
                      </span>
                    )}
                  </div>

                  {purchased ? (
                    <Link href={`/learn/${course.slug}`} className="block w-full">
                      <Button
                        size="lg"
                        className="w-full bg-brand-gradient text-white border-0"
                      >
                        Go to Course
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  ) : (
                    <PurchaseButton
                      courseId={course.id}
                      courseTitle={course.title}
                      price={course.price}
                      currency={course.currency}
                      isLoggedIn={!!session?.user}
                      courseSlug={course.slug}
                    />
                  )}

                  <ul className="mt-5 space-y-2.5 text-sm text-ink-mid">
                    <li className="flex items-center gap-2">
                      <CheckCircle
                        weight="fill"
                        className="w-4 h-4 text-emerald-500 flex-shrink-0"
                      />
                      Lifetime access
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle
                        weight="fill"
                        className="w-4 h-4 text-emerald-500 flex-shrink-0"
                      />
                      Watch on any device
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle
                        weight="fill"
                        className="w-4 h-4 text-emerald-500 flex-shrink-0"
                      />
                      Progress tracking
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What you&apos;ll learn + curriculum */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        {course.longDescription && (
          <div className="mb-14 max-w-3xl">
            <h2 className="font-serif font-semibold text-2xl text-ink mb-4">
              About This Course
            </h2>
            <p className="text-ink-mid leading-relaxed whitespace-pre-wrap">
              {course.longDescription}
            </p>
          </div>
        )}

        {/* Curriculum */}
        <div>
          <h2 className="font-serif font-semibold text-2xl text-ink mb-6">
            Course Curriculum
          </h2>
          <div className="space-y-3 max-w-3xl">
            {course.chapters.map((chapter) => (
              <details
                key={chapter.id}
                className="group border border-rule rounded-xl overflow-hidden"
                open={chapter.position === 1}
              >
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-section transition-colors list-none select-none">
                  <div>
                    <p className="text-xs font-mono text-ink-subtle mb-0.5">
                      Chapter {chapter.position}
                    </p>
                    <h3 className="font-medium text-ink">{chapter.title}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-ink-subtle">
                      {chapter.lessons.length} lessons
                    </span>
                    <CaretDown className="w-4 h-4 text-ink-subtle group-open:rotate-180 transition-transform" />
                  </div>
                </summary>
                <div className="border-t border-rule">
                  {chapter.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-section/60 transition-colors border-b border-rule last:border-0"
                    >
                      <div className="w-7 h-7 rounded-lg bg-section border border-rule flex items-center justify-center flex-shrink-0">
                        {lesson.isFree ? (
                          <Play className="w-3 h-3 text-ink-mid" />
                        ) : (
                          <Lock className="w-3 h-3 text-ink-subtle" />
                        )}
                      </div>
                      <span
                        className={`text-sm flex-1 ${
                          lesson.isFree ? "text-ink" : "text-ink-mid"
                        }`}
                      >
                        {lesson.title}
                      </span>
                      {lesson.isFree && !purchased && (
                        <span className="text-xs font-mono text-teal-mid">
                          Free Preview
                        </span>
                      )}
                      {lesson.duration && (
                        <span className="text-xs font-mono text-ink-subtle">
                          {formatDuration(lesson.duration)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>

          {/* CTA at bottom if not purchased */}
          {!purchased && firstLesson && (
            <div className="mt-10 flex flex-col sm:flex-row items-start gap-3">
              <Link href={`/learn/${course.slug}/${firstLesson.id}`}>
                <Button variant="outline" size="lg">
                  <Play className="w-4 h-4" />
                  Preview Free Lesson
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
