"use client";

import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  const cols = [
    {
      heading: "Platform",
      links: [
        { href: "/dashboard",  label: "Dashboard" },
        { href: "/courses",    label: "Courses" },
        { href: "/dashboard",  label: "Progress" },
      ],
    },
    {
      heading: "Subjects",
      links: [
        { href: "/courses?level=BEGINNER",      label: "GCSE Maths" },
        { href: "/courses?level=INTERMEDIATE",  label: "A-Level" },
        { href: "/courses?level=ADVANCED",      label: "University" },
        { href: "/courses?level=ADVANCED",      label: "Olympiad" },
      ],
    },
    {
      heading: "Contact",
      links: [
        { href: "/courses",              label: "Browse Courses" },
        { href: "mailto:hello@oxmans.co", label: "hello@oxmans.co" },
        { href: "#",                     label: "WhatsApp" },
        { href: "#",                     label: "FAQ" },
      ],
    },
  ];

  return (
    <footer style={{ background: "var(--ink)", padding: "72px 0 40px" }}>
      <div className="max-w-[1240px] mx-auto px-10">

        {/* Main grid — 2fr 1fr 1fr 1fr */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px" }}
             className="max-md:grid-cols-2 max-sm:grid-cols-1">

          {/* Brand column */}
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", textDecoration: "none" }}>
              <svg width="28" height="26" viewBox="0 0 100 90" aria-hidden="true">
                <defs>
                  <linearGradient id="fc" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5ecfcf" />
                    <stop offset="100%" stopColor="#1a6fa8" />
                  </linearGradient>
                  <linearGradient id="fd" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6b3fa0" />
                    <stop offset="100%" stopColor="#e060a8" />
                  </linearGradient>
                </defs>
                <path d="M8 84L50 8L62 8L20 84Z" fill="url(#fc)" opacity=".9" />
                <path d="M62 8L74 8L92 84L80 84Z" fill="url(#fd)" opacity=".9" />
                <path d="M20 84L38 84L38 72L20 72Z" fill="#e84830" opacity=".85" />
              </svg>
              <span style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>
                Oxman&apos;s
              </span>
            </Link>
            <p style={{ fontSize: ".84rem", lineHeight: 1.6, color: "rgba(255,255,255,.4)", fontWeight: 300, maxWidth: "260px" }}>
              Private mathematics tutoring built around your goals, your pace, and your exam.
            </p>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.heading}>
              <p style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: ".65rem", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.35)", marginBottom: "18px" }}>
                {col.heading}
              </p>
              <ul style={{ listStyle: "none" }}>
                {col.links.map((l) => (
                  <li key={l.label} style={{ marginBottom: "10px" }}>
                    <Link
                      href={l.href}
                      style={{ fontSize: ".84rem", color: "rgba(255,255,255,.55)", textDecoration: "none", transition: "color .2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#5ecfcf")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.55)")}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ marginTop: "64px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: ".78rem", color: "rgba(255,255,255,.3)" }}>
            © {year} Oxman&apos;s. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {[{ href: "#", label: "Privacy Policy" }, { href: "#", label: "Terms of Use" }].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                style={{ fontSize: ".78rem", color: "rgba(255,255,255,.3)", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,.6)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.3)")}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
