"use client";

import Link from "next/link";
import { useState } from "react";
import { CaretDown, CheckCircle, Circle, Play, Lock } from "@phosphor-icons/react";
import { cn, formatDuration } from "@/lib/utils";

interface Lesson {
  id: string;
  title: string;
  duration: number | null;
  isFree: boolean;
  position: number;
}

interface Chapter {
  id: string;
  title: string;
  position: number;
  lessons: Lesson[];
}

interface CourseSidebarProps {
  courseId: string;
  courseTitle: string;
  chapters: Chapter[];
  currentLessonId: string;
  completedLessonIds: string[];
  totalLessons: number;
  completedCount: number;
  purchased: boolean;
  onLessonSelect?: (lessonId: string) => void;
}

export function CourseSidebar({
  courseId,
  courseTitle,
  chapters,
  currentLessonId,
  completedLessonIds,
  totalLessons,
  completedCount,
  purchased,
  onLessonSelect,
}: CourseSidebarProps) {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    () => {
      const initial = new Set<string>();
      chapters.forEach((ch) => {
        if (ch.lessons.some((l) => l.id === currentLessonId)) {
          initial.add(ch.id);
        }
      });
      if (initial.size === 0 && chapters.length > 0) {
        initial.add(chapters[0].id);
      }
      return initial;
    }
  );

  const progressPercent =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  };

  return (
    <aside className="w-full h-full flex flex-col bg-section border-r border-rule overflow-hidden">
      {/* Header */}
      <div className="px-4 py-4 border-b border-rule flex-shrink-0">
        <h2 className="font-serif font-semibold text-sm text-ink leading-snug line-clamp-2 mb-3">
          {courseTitle}
        </h2>
        {/* Progress */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-ink-subtle font-mono">Progress</span>
          <span className="text-xs font-mono font-medium text-ink">
            {completedCount}/{totalLessons}
          </span>
        </div>
        <div className="h-1.5 bg-rule rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-gradient rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Chapters list */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {chapters.map((chapter) => {
          const isExpanded = expandedChapters.has(chapter.id);
          const completedInChapter = chapter.lessons.filter((l) =>
            completedLessonIds.includes(l.id)
          ).length;

          return (
            <div key={chapter.id} className="border-b border-rule last:border-0">
              <button
                onClick={() => toggleChapter(chapter.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-rule/40 transition-colors text-left"
              >
                <div className="flex-1 min-w-0 mr-2">
                  <p className="text-xs font-mono text-ink-subtle uppercase tracking-wide mb-0.5">
                    Chapter {chapter.position}
                  </p>
                  <p className="text-sm font-medium text-ink truncate">
                    {chapter.title}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-ink-subtle font-mono">
                    {completedInChapter}/{chapter.lessons.length}
                  </span>
                  <CaretDown
                    className={cn(
                      "w-3.5 h-3.5 text-ink-subtle transition-transform duration-200",
                      isExpanded && "rotate-180"
                    )}
                  />
                </div>
              </button>

              {isExpanded && (
                <div className="bg-page/60">
                  {chapter.lessons.map((lesson) => {
                    const isActive = lesson.id === currentLessonId;
                    const isCompleted = completedLessonIds.includes(lesson.id);
                    const isAccessible = purchased || lesson.isFree;

                    if (!isAccessible) {
                      return (
                        <div
                          key={lesson.id}
                          className="flex items-center gap-3 px-4 py-2.5 opacity-50"
                        >
                          <Lock className="w-4 h-4 text-ink-subtle flex-shrink-0" />
                          <span className="text-sm text-ink-subtle truncate flex-1">
                            {lesson.title}
                          </span>
                          {lesson.duration && (
                            <span className="text-xs text-ink-subtle font-mono flex-shrink-0">
                              {formatDuration(lesson.duration)}
                            </span>
                          )}
                        </div>
                      );
                    }

                    const lessonItemClass = cn(
                      "flex items-center gap-3 px-4 py-2.5 transition-all duration-150",
                      isActive
                        ? "bg-purple/10 border-l-2 border-purple"
                        : "hover:bg-section border-l-2 border-transparent"
                    );

                    const lessonContent = (
                      <>
                        <div className="flex-shrink-0">
                          {isCompleted ? (
                            <CheckCircle
                              weight="fill"
                              className="w-4 h-4 text-emerald-500"
                            />
                          ) : isActive ? (
                            <Play
                              weight="fill"
                              className="w-4 h-4 text-purple"
                            />
                          ) : (
                            <Circle className="w-4 h-4 text-ink-subtle" />
                          )}
                        </div>
                        <span
                          className={cn(
                            "text-sm truncate flex-1",
                            isActive ? "text-ink font-medium" : "text-ink-mid"
                          )}
                        >
                          {lesson.title}
                        </span>
                        {lesson.duration && (
                          <span className="text-xs text-ink-subtle font-mono flex-shrink-0">
                            {formatDuration(lesson.duration)}
                          </span>
                        )}
                      </>
                    );

                    return onLessonSelect ? (
                      <button
                        key={lesson.id}
                        onClick={() => onLessonSelect(lesson.id)}
                        className={cn(lessonItemClass, "w-full text-left")}
                      >
                        {lessonContent}
                      </button>
                    ) : (
                      <Link
                        key={lesson.id}
                        href={`/courses/${courseId}/learn?lessonId=${lesson.id}`}
                        className={lessonItemClass}
                      >
                        {lessonContent}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
