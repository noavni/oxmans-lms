"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

interface LessonNavigationProps {
  courseId: string;
  prevLesson: { id: string; title: string } | null;
  nextLesson: { id: string; title: string } | null;
}

export function LessonNavigation({
  courseId,
  prevLesson,
  nextLesson,
}: LessonNavigationProps) {
  return (
    <div className="mt-10 pt-6 border-t border-rule flex items-center justify-between gap-4">
      {prevLesson ? (
        <Link href={`/learn/${courseId}/${prevLesson.id}`} className="flex-1 max-w-xs">
          <Button variant="outline" size="md" className="w-full justify-start">
            <ArrowLeft className="w-4 h-4 flex-shrink-0" />
            <div className="text-left min-w-0">
              <div className="text-xs text-ink-subtle font-mono mb-0.5">Previous</div>
              <div className="text-sm truncate">{prevLesson.title}</div>
            </div>
          </Button>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {nextLesson ? (
        <Link href={`/learn/${courseId}/${nextLesson.id}`} className="flex-1 max-w-xs ml-auto">
          <Button
            size="md"
            className="w-full justify-end bg-brand-gradient text-white border-0 hover:opacity-90"
          >
            <div className="text-right min-w-0">
              <div className="text-xs text-white/70 font-mono mb-0.5">Next</div>
              <div className="text-sm truncate">{nextLesson.title}</div>
            </div>
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </Button>
        </Link>
      ) : (
        <div className="flex-1 max-w-xs ml-auto">
          <div className="text-center py-3 px-4 rounded-xl bg-section border border-rule">
            <p className="text-xs font-mono text-ink-subtle">
              Course complete. Well done.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
