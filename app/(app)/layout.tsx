import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { House, BookOpen } from "@phosphor-icons/react/dist/ssr";
import { SignOutButton } from "./sign-out-button";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const initials = (
    session.user.name?.[0] ?? session.user.email?.[0] ?? "U"
  ).toUpperCase();

  const H = "var(--font-playfair),Georgia,serif";
  const M = "var(--font-dm-mono),monospace";

  return (
    <SessionProvider>
      <div style={{ minHeight: "100dvh", display: "flex", background: "var(--bg)" }}>

        {/* ── Desktop sidebar ─────────────────────────────────────────────── */}
        <aside
          style={{
            width: "260px",
            flexShrink: 0,
            height: "100vh",
            position: "sticky",
            top: 0,
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(170deg, rgba(94,207,207,.08) 0%, rgba(107,63,160,.04) 120px, rgba(244,243,239,0) 280px), rgba(244,243,239,.98)",
            backdropFilter: "blur(20px) saturate(160%)",
            WebkitBackdropFilter: "blur(20px) saturate(160%)",
            borderRight: "1px solid rgba(228,226,220,.9)",
            zIndex: 40,
          }}
          className="hidden md:flex"
        >
          {/* Logo */}
          <div style={{ padding: "20px 24px 18px", borderBottom: "1px solid rgba(228,226,220,.5)" }}>
            <Link
              href="/"
              style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}
            >
              <svg width="28" height="26" viewBox="0 0 100 90" aria-hidden="true">
                <defs>
                  <linearGradient id="sl-a" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5ecfcf" />
                    <stop offset="100%" stopColor="#1a6fa8" />
                  </linearGradient>
                  <linearGradient id="sl-b" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6b3fa0" />
                    <stop offset="100%" stopColor="#e060a8" />
                  </linearGradient>
                </defs>
                <path d="M8 84L50 8L62 8L20 84Z" fill="url(#sl-a)" opacity=".92" />
                <path d="M62 8L74 8L92 84L80 84Z" fill="url(#sl-b)" opacity=".92" />
                <path d="M20 84L38 84L38 72L20 72Z" fill="#e84830" opacity=".88" />
              </svg>
              <span style={{ fontFamily: H, fontSize: "1.15rem", fontWeight: 700, color: "var(--ink)", letterSpacing: "-.02em" }}>
                Oxman&apos;s
              </span>
            </Link>
          </div>

          {/* Nav links */}
          <nav style={{ flex: 1, padding: "20px 12px" }}>
            <p style={{ fontFamily: M, fontSize: ".6rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--is)", padding: "0 12px", marginBottom: "10px" }}>
              Menu
            </p>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 text-ink-mid hover:text-teal-mid hover:bg-teal-light/[.07] group"
            >
              <House weight="duotone" className="w-4 h-4 flex-shrink-0 transition-colors group-hover:text-teal-mid" />
              Dashboard
            </Link>
            <Link
              href="/courses"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 text-ink-mid hover:text-teal-mid hover:bg-teal-light/[.07] group"
            >
              <BookOpen weight="duotone" className="w-4 h-4 flex-shrink-0 transition-colors group-hover:text-teal-mid" />
              Browse Courses
            </Link>
          </nav>

          {/* User section */}
          <div style={{ padding: "12px", borderTop: "1px solid rgba(228,226,220,.5)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "14px", background: "rgba(244,243,239,.8)", marginBottom: "8px" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "linear-gradient(135deg,#5ecfcf,#6b3fa0)",
                display: "grid", placeItems: "center", flexShrink: 0,
                fontFamily: H, fontSize: ".95rem", fontWeight: 700, color: "#fff",
              }}>
                {initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: ".84rem", fontWeight: 500, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {session.user.name ?? "Student"}
                </p>
                <p style={{ fontSize: ".72rem", color: "var(--is)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: "1px" }}>
                  {session.user.email}
                </p>
              </div>
            </div>
            <SignOutButton />
          </div>
        </aside>

        {/* ── Mobile top bar ───────────────────────────────────────────────── */}
        <div
          className="md:hidden fixed top-0 left-0 right-0 z-50 px-4 flex items-center justify-between"
          style={{
            height: "56px",
            background: "rgba(250,250,248,.95)",
            backdropFilter: "blur(18px) saturate(160%)",
            WebkitBackdropFilter: "blur(18px) saturate(160%)",
            borderBottom: "1px solid rgba(228,226,220,.7)",
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <svg width="24" height="22" viewBox="0 0 100 90" aria-hidden="true">
              <defs>
                <linearGradient id="mob-a" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5ecfcf" /><stop offset="100%" stopColor="#1a6fa8" />
                </linearGradient>
                <linearGradient id="mob-b" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6b3fa0" /><stop offset="100%" stopColor="#e060a8" />
                </linearGradient>
              </defs>
              <path d="M8 84L50 8L62 8L20 84Z" fill="url(#mob-a)" opacity=".92" />
              <path d="M62 8L74 8L92 84L80 84Z" fill="url(#mob-b)" opacity=".92" />
              <path d="M20 84L38 84L38 72L20 72Z" fill="#e84830" opacity=".88" />
            </svg>
            <span style={{ fontFamily: H, fontWeight: 700, fontSize: "1.05rem", color: "var(--ink)" }}>
              Oxman&apos;s
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <Link href="/dashboard" className="p-2 rounded-lg text-ink-subtle hover:text-ink hover:bg-rule/60 transition-all">
              <House weight="duotone" className="w-4 h-4" />
            </Link>
            <Link href="/courses" className="p-2 rounded-lg text-ink-subtle hover:text-ink hover:bg-rule/60 transition-all">
              <BookOpen weight="duotone" className="w-4 h-4" />
            </Link>
            <SignOutButton iconOnly />
          </div>
        </div>

        {/* ── Main content ─────────────────────────────────────────────────── */}
        <main style={{ flex: 1, minWidth: 0, overflowY: "auto" }}>
          <div className="md:hidden" style={{ height: "56px" }} aria-hidden />
          {children}
        </main>

      </div>
    </SessionProvider>
  );
}
