import Link from "next/link";
import Image from "next/image";
import { BookOpen, Clock, ArrowRight, Lock, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import { formatPrice, getLevelLabel } from "@/lib/utils";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    currency: string;
    thumbnail: string | null;
    level: string;
    chapters: {
      lessons: {
        id: string;
        duration: number | null;
      }[];
    }[];
  };
  purchased?: boolean;
}

function getLevelBadgeVariant(level: string): "teal" | "blue" | "purple" {
  if (level === "BEGINNER") return "teal";
  if (level === "INTERMEDIATE") return "blue";
  return "purple";
}

export function CourseCard({ course, purchased }: CourseCardProps) {
  const totalLessons = course.chapters.reduce(
    (acc, ch) => acc + ch.lessons.length,
    0
  );
  const totalDuration = course.chapters.reduce(
    (acc, ch) =>
      acc + ch.lessons.reduce((a, l) => a + (l.duration ?? 0), 0),
    0
  );
  const hours = Math.floor(totalDuration / 3600);
  const minutes = Math.floor((totalDuration % 3600) / 60);
  const durationLabel =
    hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group block bg-page border border-rule rounded-2xl overflow-hidden hover:border-ink-mid/30 hover:shadow-xl hover:shadow-ink/5 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] bg-section overflow-hidden">
        {course.thumbnail ? (
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-brand-gradient-subtle flex items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center">
              <BookOpen weight="duotone" className="w-7 h-7 text-white" />
            </div>
          </div>
        )}
        {purchased && (
          <div className="absolute top-3 right-3 bg-emerald-500 text-white rounded-full px-2.5 py-1 text-xs font-medium flex items-center gap-1.5">
            <CheckCircle weight="fill" className="w-3 h-3" />
            Enrolled
          </div>
        )}
        {!purchased && course.price === 0 && (
          <div className="absolute top-3 right-3 bg-teal-mid text-white rounded-full px-2.5 py-1 text-xs font-medium">
            Free
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <Badge variant={getLevelBadgeVariant(course.level)}>
            {getLevelLabel(course.level)}
          </Badge>
          {!purchased && (
            <span className="font-mono text-sm font-semibold text-ink">
              {course.price === 0 ? "Free" : formatPrice(course.price, course.currency)}
            </span>
          )}
        </div>

        <h3 className="font-serif font-semibold text-lg text-ink mb-2 leading-snug group-hover:text-purple transition-colors line-clamp-2">
          {course.title}
        </h3>

        <p className="text-sm text-ink-subtle leading-relaxed line-clamp-2 mb-4">
          {course.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-rule">
          <div className="flex items-center gap-3 text-xs text-ink-subtle font-mono">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {totalLessons} lessons
            </span>
            {totalDuration > 0 && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {durationLabel}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs font-medium text-purple group-hover:gap-2 transition-all">
            {purchased ? (
              <>
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <Lock className="w-3 h-3" />
                <span>Enroll</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
