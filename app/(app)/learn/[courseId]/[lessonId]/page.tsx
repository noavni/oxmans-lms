import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CourseSidebar } from "@/components/course-sidebar";
import { VideoPlayer } from "@/components/video-player";
import { LessonNavigation } from "./lesson-navigation";
import { ArrowLeft, Lock, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: { title: true },
  });
  return { title: lesson?.title ?? "Lesson" };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    redirect(`/login?callbackUrl=/learn/${courseId}/${lessonId}`);
  }

  const course = await prisma.course.findUnique({
    where: { slug: courseId },
    include: {
      chapters: {
        orderBy: { position: "asc" },
        include: {
          lessons: {
            orderBy: { position: "asc" },
          },
        },
      },
    },
  });

  if (!course) notFound();

  const purchase = await prisma.purchase.findUnique({
    where: {
      userId_courseId: {
        userId: session.user.id,
        courseId: course.id,
      },
    },
  });

  // Find the current lesson
  const allLessons = course.chapters.flatMap((ch) => ch.lessons);
  const lesson = allLessons.find((l) => l.id === lessonId);

  if (!lesson) notFound();

  const isLocked = !purchase && !lesson.isFree;

  // Progress
  const progressRecords = await prisma.progress.findMany({
    where: { userId: session.user.id },
    select: { lessonId: true, completed: true },
  });
  const completedLessonIds = progressRecords
    .filter((p) => p.completed)
    .map((p) => p.lessonId);

  const totalLessons = allLessons.length;
  const completedCount = completedLessonIds.length;

  // Prev / Next
  const lessonIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = lessonIndex > 0 ? allLessons[lessonIndex - 1] : null;
  const nextLesson =
    lessonIndex < allLessons.length - 1 ? allLessons[lessonIndex + 1] : null;

  return (
    <div className="flex h-[100dvh] md:h-screen bg-page overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex w-[300px] flex-shrink-0 h-full">
        <CourseSidebar
          courseId={courseId}
          courseTitle={course.title}
          chapters={course.chapters}
          currentLessonId={lessonId}
          completedLessonIds={completedLessonIds}
          totalLessons={totalLessons}
          completedCount={completedCount}
          purchased={!!purchase}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top bar */}
        <div className="flex-shrink-0 flex items-center gap-3 px-5 py-3 border-b border-rule bg-page/80 backdrop-blur-sm sticky top-0 z-10">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-sm text-ink-subtle hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <div className="w-px h-4 bg-rule mx-1" />
          <h2 className="text-sm font-medium text-ink truncate flex-1">
            {course.title}
          </h2>
          {/* Mobile progress indicator */}
          <span className="text-xs font-mono text-ink-subtle flex-shrink-0">
            {completedCount}/{totalLessons}
          </span>
        </div>

        {/* Video + content */}
        <div className="flex-1 px-4 sm:px-8 py-6 max-w-5xl mx-auto w-full">
          {/* Video player or locked state */}
          {isLocked ? (
            <div className="aspect-video bg-ink rounded-xl flex flex-col items-center justify-center gap-6 px-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Lock weight="duotone" className="w-8 h-8 text-white/50" />
              </div>
              <div>
                <p className="font-serif font-semibold text-xl text-page mb-2">
                  This lesson is locked
                </p>
                <p className="text-page/50 text-sm leading-relaxed max-w-xs mx-auto">
                  Purchase the full course to unlock all lessons and track your progress.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href={`/courses/${course.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white"
                  style={{ background: "var(--gb)" }}
                >
                  {course.price === 0
                    ? "Enroll Free"
                    : `Unlock for ${formatPrice(course.price, course.currency)}`}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : lesson.videoUrl ? (
            <VideoPlayer
              videoUrl={lesson.videoUrl}
              lessonId={lesson.id}
            />
          ) : (
            <div className="aspect-video bg-ink rounded-xl flex items-center justify-center">
              <p className="text-page/40 text-sm font-mono">
                No video available for this lesson
              </p>
            </div>
          )}

          {/* Lesson info */}
          <div className="mt-6">
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-ink mb-2">
              {lesson.title}
            </h1>
            {lesson.description && (
              <p className="text-ink-mid leading-relaxed mt-3 text-base whitespace-pre-wrap">
                {lesson.description}
              </p>
            )}
          </div>

          {/* Navigation (hide mark-complete for locked lessons) */}
          {!isLocked && (
            <LessonNavigation
              courseId={courseId}
              prevLesson={prevLesson ? { id: prevLesson.id, title: prevLesson.title } : null}
              nextLesson={nextLesson ? { id: nextLesson.id, title: nextLesson.title } : null}
            />
          )}
        </div>
      </div>
    </div>
  );
}
