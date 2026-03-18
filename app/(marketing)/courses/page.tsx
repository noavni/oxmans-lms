import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { CourseCard } from "@/components/course-card";
import { RevealInit } from "@/components/reveal-init";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

interface SearchParams {
  level?: string;
  search?: string;
}

export const metadata = {
  title: "Courses",
  description: "Browse all mathematics courses — from secondary school to university level.",
};

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const session = await auth();

  const levelFilter = params.level
    ? (["BEGINNER", "INTERMEDIATE", "ADVANCED"].includes(params.level)
        ? params.level
        : undefined)
    : undefined;

  const courses = await prisma.course.findMany({
    where: {
      isPublished: true,
      ...(levelFilter ? { level: levelFilter as "BEGINNER" | "INTERMEDIATE" | "ADVANCED" } : {}),
      ...(params.search
        ? {
            OR: [
              { title: { contains: params.search } },
              { description: { contains: params.search } },
            ],
          }
        : {}),
    },
    include: {
      chapters: {
        include: {
          lessons: {
            select: { id: true, duration: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const purchasedCourseIds = session?.user?.id
    ? (
        await prisma.purchase.findMany({
          where: { userId: session.user.id },
          select: { courseId: true },
        })
      ).map((p) => p.courseId)
    : [];

  const LEVEL_FILTERS = [
    { value: undefined, label: "All Levels" },
    { value: "BEGINNER", label: "Secondary" },
    { value: "INTERMEDIATE", label: "A-Level" },
    { value: "ADVANCED", label: "University" },
  ];

  return (
    <div className="min-h-[100dvh] pt-24 pb-20 px-5 sm:px-8">
      <RevealInit />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="rv mb-10">
          <p className="text-xs font-mono uppercase tracking-widest text-ink-subtle mb-2">
            Learn Mathematics
          </p>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl text-ink mb-4">
            All Courses
          </h1>
          <p className="text-ink-mid max-w-xl">
            Structured courses from secondary school through university level. Every
            topic taught with clarity, rigor, and genuine depth.
          </p>
        </div>

        {/* Filters + search row */}
        <div className="rv d1 flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
          {/* Level filters */}
          <div className="flex flex-wrap items-center gap-2">
            {LEVEL_FILTERS.map((filter) => {
              const isActive = levelFilter === filter.value;
              const href = filter.value
                ? `/courses?level=${filter.value}`
                : "/courses";
              return (
                <Link key={filter.label} href={href}>
                  <Badge
                    variant={isActive ? "purple" : "default"}
                    className="cursor-pointer hover:border-ink-mid/30 transition-colors"
                  >
                    {filter.label}
                  </Badge>
                </Link>
              );
            })}
          </div>

          {/* Search */}
          <form method="GET" action="/courses" className="sm:ml-auto">
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-subtle" />
              <input
                name="search"
                defaultValue={params.search ?? ""}
                placeholder="Search courses…"
                className="pl-9 pr-4 h-9 rounded-xl border border-rule bg-section text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-purple/50 focus:ring-1 focus:ring-purple/20 transition-all w-56"
              />
              {levelFilter && (
                <input type="hidden" name="level" value={levelFilter} />
              )}
            </div>
          </form>
        </div>

        {/* Grid */}
        {courses.length === 0 ? (
          <div className="rv text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-section border border-rule flex items-center justify-center mx-auto mb-4">
              <MagnifyingGlass className="w-7 h-7 text-ink-subtle" />
            </div>
            <h3 className="font-serif font-semibold text-xl text-ink mb-2">
              No courses found
            </h3>
            <p className="text-ink-subtle text-sm">
              Try adjusting your filters or check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <div key={course.id} className={`rv${i % 3 === 1 ? " d1" : i % 3 === 2 ? " d2" : ""}`}>
                <CourseCard
                  course={course}
                  purchased={purchasedCourseIds.includes(course.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
