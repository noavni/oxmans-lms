import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  BookOpen, ArrowRight, CheckCircle, Trophy, Flame,
} from "@phosphor-icons/react/dist/ssr";
import { getLevelLabel, formatDuration } from "@/lib/utils";

export const metadata = { title: "Dashboard" };

const LEVEL_ACCENT: Record<string, string> = {
  BEGINNER:     "linear-gradient(90deg,#5ecfcf,#2da8c8)",
  INTERMEDIATE: "linear-gradient(90deg,#6b3fa0,#e060a8)",
  ADVANCED:     "linear-gradient(90deg,#e060a8,#e84830)",
};
const LEVEL_COLOR: Record<string, { bg: string; text: string }> = {
  BEGINNER:     { bg: "rgba(45,168,200,.1)",  text: "#2da8c8" },
  INTERMEDIATE: { bg: "rgba(107,63,160,.1)", text: "#6b3fa0" },
  ADVANCED:     { bg: "rgba(224,96,168,.1)", text: "#c04fa0" },
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const purchases = await prisma.purchase.findMany({
    where: { userId: session.user.id },
    include: {
      course: {
        include: {
          chapters: {
            include: { lessons: { select: { id: true, duration: true } } },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const progressRecords = await prisma.progress.findMany({
    where: { userId: session.user.id, completed: true },
    select: { lessonId: true },
  });
  const completedIds = new Set(progressRecords.map((p) => p.lessonId));

  const coursesWithProgress = purchases.map(({ course, ...purchase }) => {
    const allLessons = course.chapters.flatMap((ch) => ch.lessons);
    const total = allLessons.length;
    const completed = allLessons.filter((l) => completedIds.has(l.id)).length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    const totalDuration = allLessons.reduce((a, l) => a + (l.duration ?? 0), 0);
    let resumeId: string | null = null;
    for (const ch of course.chapters) {
      for (const l of ch.lessons) {
        if (!completedIds.has(l.id)) { resumeId = l.id; break; }
      }
      if (resumeId) break;
    }
    return { ...purchase, course: { ...course, total, completed, pct, totalDuration, resumeId } };
  });

  const totalCompleted = completedIds.size;
  const coursesFinished = coursesWithProgress.filter((c) => c.course.pct === 100).length;
  const firstName = session.user.name?.split(" ")[0] ?? "Student";

  const H = "var(--font-playfair),Georgia,serif";
  const M = "var(--font-dm-mono),monospace";

  const STATS = [
    { label: "Enrolled Courses", value: purchases.length,   grad: "linear-gradient(135deg,#5ecfcf,#1a6fa8)", iconBg: "rgba(45,168,200,.1)",  iconColor: "#2da8c8", Icon: BookOpen    },
    { label: "Lessons Complete", value: totalCompleted,      grad: "linear-gradient(135deg,#6b3fa0,#e060a8)", iconBg: "rgba(107,63,160,.1)", iconColor: "#6b3fa0", Icon: CheckCircle },
    { label: "Courses Finished", value: coursesFinished,     grad: "linear-gradient(135deg,#e060a8,#e84830)", iconBg: "rgba(232,72,48,.1)",  iconColor: "#e060a8", Icon: Trophy      },
  ];

  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)", padding: "clamp(28px,5vw,52px) clamp(20px,5vw,48px)" }}>

      {/* ── Welcome ──────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: "44px" }}>
        <span style={{ fontFamily: M, fontSize: ".62rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--is)", display: "block", marginBottom: "10px" }}>
          Welcome back
        </span>
        <h1 style={{ fontFamily: H, fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 700, lineHeight: 1.1, color: "var(--ink)", marginBottom: "8px" }}>
          <span className="gradient-text">{firstName}</span>
        </h1>
        <p style={{ fontSize: ".95rem", fontWeight: 300, color: "var(--is)", lineHeight: 1.6 }}>
          Continue where you left off or explore new courses.
        </p>
      </div>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px", marginBottom: "52px" }}>
        {STATS.map(({ label, value, grad, iconBg, iconColor, Icon }) => (
          <div
            key={label}
            style={{
              background: "#fff",
              border: "1px solid var(--ru)",
              borderRadius: "20px",
              padding: "28px 24px",
              boxShadow: "0 2px 16px rgba(15,14,12,.05)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top accent */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: grad }} />
            {/* Icon */}
            <div style={{ width: 44, height: 44, borderRadius: "12px", background: iconBg, display: "grid", placeItems: "center", marginBottom: "20px" }}>
              <Icon weight="duotone" style={{ width: 20, height: 20, color: iconColor }} />
            </div>
            {/* Value */}
            <span style={{
              fontFamily: H, fontSize: "2.4rem", fontWeight: 700, lineHeight: 1, display: "block", marginBottom: "6px",
              background: grad, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              {value}
            </span>
            <span style={{ fontFamily: M, fontSize: ".66rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--is)" }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Courses ──────────────────────────────────────────────────────── */}
      {coursesWithProgress.length === 0 ? (
        /* Empty state */
        <div style={{
          textAlign: "center", padding: "80px 40px",
          border: "1.5px dashed var(--ru)", borderRadius: "24px",
          background: "#fff",
        }}>
          <div style={{ width: 64, height: 64, borderRadius: "18px", background: "var(--bs)", border: "1px solid var(--ru)", display: "grid", placeItems: "center", margin: "0 auto 20px" }}>
            <Flame weight="duotone" style={{ width: 28, height: 28, color: "var(--is)" }} />
          </div>
          <h3 style={{ fontFamily: H, fontSize: "1.3rem", fontWeight: 600, color: "var(--ink)", marginBottom: "10px" }}>
            No courses yet
          </h3>
          <p style={{ fontSize: ".88rem", color: "var(--is)", marginBottom: "28px", maxWidth: "280px", margin: "0 auto 28px", lineHeight: 1.6 }}>
            Browse our catalogue and enrol in your first mathematics course.
          </p>
          <Link href="/courses" className="btn-primary" style={{ display: "inline-flex" }}>
            Browse Courses
            <ArrowRight style={{ width: 16, height: 16 }} />
          </Link>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "24px" }}>
            <h2 style={{ fontFamily: H, fontSize: "1.4rem", fontWeight: 600, color: "var(--ink)" }}>
              Your Courses
            </h2>
            <Link
              href="/courses"
              style={{ fontSize: ".82rem", color: "var(--is)", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px", transition: "color .2s" }}
              className="hover:text-teal-mid transition-colors"
            >
              Browse more
              <ArrowRight style={{ width: 13, height: 13 }} />
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {coursesWithProgress.map((item) => {
              const c = item.course;
              const accent = LEVEL_ACCENT[c.level] ?? "linear-gradient(90deg,#5ecfcf,#1a6fa8)";
              const lc = LEVEL_COLOR[c.level] ?? LEVEL_COLOR.BEGINNER;
              return (
                <div
                  key={item.id}
                  style={{
                    background: "#fff",
                    border: "1px solid var(--ru)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 2px 12px rgba(15,14,12,.05)",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {/* Gradient left bar */}
                  <div style={{ width: "4px", flexShrink: 0, background: accent }} />

                  {/* Thumbnail */}
                  {c.thumbnail ? (
                    <div style={{ position: "relative", width: "140px", flexShrink: 0 }} className="hidden sm:block">
                      <Image src={c.thumbnail} alt={c.title} fill className="object-cover" />
                    </div>
                  ) : (
                    <div
                      style={{ width: "140px", flexShrink: 0, background: "linear-gradient(135deg,rgba(94,207,207,.12),rgba(107,63,160,.12))", display: "grid", placeItems: "center" }}
                      className="hidden sm:grid"
                    >
                      <BookOpen weight="duotone" style={{ width: 28, height: 28, color: "var(--is)" }} />
                    </div>
                  )}

                  {/* Content */}
                  <div style={{ flex: 1, padding: "24px 28px", minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>

                      {/* Left: info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Level badge */}
                        <span style={{
                          fontFamily: M, fontSize: ".63rem", letterSpacing: ".12em", textTransform: "uppercase",
                          padding: "3px 10px", borderRadius: "100px", display: "inline-block", marginBottom: "10px",
                          background: lc.bg, color: lc.text,
                        }}>
                          {getLevelLabel(c.level)}
                          {c.pct === 100 && " · Complete"}
                        </span>
                        <h3 style={{ fontFamily: H, fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", lineHeight: 1.25, marginBottom: "6px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {c.title}
                        </h3>
                        <p style={{ fontFamily: M, fontSize: ".72rem", color: "var(--is)", letterSpacing: ".04em" }}>
                          {c.completed}/{c.total} lessons
                          {c.totalDuration > 0 && ` · ${formatDuration(c.totalDuration)} total`}
                        </p>
                      </div>

                      {/* Right: CTA */}
                      <div style={{ flexShrink: 0 }}>
                        {c.resumeId ? (
                          <Link
                            href={`/learn/${c.slug}/${c.resumeId}`}
                            style={{
                              display: "inline-flex", alignItems: "center", gap: "7px",
                              padding: "10px 20px", borderRadius: "100px",
                              background: "var(--ink)", color: "#fff",
                              fontSize: ".82rem", fontWeight: 500, textDecoration: "none",
                              transition: "background .2s, transform .2s",
                            }}
                            className="hover:bg-blue-deep hover:-translate-y-px transition-all"
                          >
                            Continue
                            <ArrowRight style={{ width: 13, height: 13 }} />
                          </Link>
                        ) : (
                          <Link
                            href={`/learn/${c.slug}`}
                            style={{
                              display: "inline-flex", alignItems: "center", gap: "7px",
                              padding: "10px 20px", borderRadius: "100px",
                              background: "transparent", color: "var(--im)",
                              fontSize: ".82rem", fontWeight: 400, textDecoration: "none",
                              border: "1.5px solid var(--ru)",
                              transition: "border-color .2s, color .2s",
                            }}
                            className="hover:border-teal-mid hover:text-teal-mid transition-all"
                          >
                            Review
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div style={{ marginTop: "20px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "7px" }}>
                        <span style={{ fontFamily: M, fontSize: ".65rem", letterSpacing: ".06em", color: "var(--is)", textTransform: "uppercase" }}>Progress</span>
                        <span style={{ fontFamily: M, fontSize: ".72rem", fontWeight: 500, color: c.pct === 100 ? "#2da8c8" : "var(--im)" }}>{c.pct}%</span>
                      </div>
                      <div style={{ height: "5px", background: "var(--ru)", borderRadius: "99px", overflow: "hidden" }}>
                        <div style={{
                          height: "100%", borderRadius: "99px",
                          background: accent,
                          width: `${c.pct}%`,
                          transition: "width .6s cubic-bezier(.2,.8,.4,1)",
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
