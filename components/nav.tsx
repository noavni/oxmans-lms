"use client";

import Link from "next/link";
import OxLogo from "@/components/ox-logo";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export function Nav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#features",      label: "Features" },
    { href: "/courses",        label: "Curriculum" },
    { href: "/#testimonials",  label: "Reviews" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: scrolled ? "14px 48px" : "20px 48px",
        background: "rgba(250,250,248,.92)",
        backdropFilter: "blur(18px) saturate(160%)",
        WebkitBackdropFilter: "blur(18px) saturate(160%)",
        borderBottom: "1px solid rgba(228,226,220,.7)",
        transition: "padding .3s",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
        <OxLogo size={34} />
        <span style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.2rem", fontWeight: 700, color: "var(--ink)", letterSpacing: "-.02em" }}>
          Oxman&apos;s
        </span>
      </Link>

      {/* Desktop links */}
      <div style={{ display: "flex", alignItems: "center", gap: "36px" }} className="hidden md:flex">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{ fontSize: ".85rem", color: pathname === l.href ? "var(--tm)" : "var(--im)", textDecoration: "none", transition: "color .2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--tm)")}
            onMouseLeave={e => (e.currentTarget.style.color = pathname === l.href ? "var(--tm)" : "var(--im)")}
          >
            {l.label}
          </Link>
        ))}

        {session ? (
          <>
            <Link
              href="/dashboard"
              style={{ fontSize: ".85rem", color: "var(--im)", textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--tm)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--im)")}
            >
              Dashboard
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              style={{ padding: "9px 22px", background: "var(--ink)", color: "#fff", borderRadius: "100px", border: "none", fontSize: ".85rem", fontWeight: 500, cursor: "none", transition: "background .2s, transform .2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--bd)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--ink)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              style={{ fontSize: ".85rem", color: "var(--im)", textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--tm)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--im)")}
            >
              Sign In
            </Link>
            <Link
              href="/courses"
              style={{ padding: "9px 22px", background: "var(--ink)", color: "#fff", borderRadius: "100px", fontSize: ".85rem", fontWeight: 500, textDecoration: "none", transition: "background .2s, transform .2s", display: "inline-block" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--bd)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--ink)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
            >
              Browse Courses
            </Link>
          </>
        )}
      </div>

      {/* Mobile — just CTA */}
      <div className="md:hidden">
        <Link
          href="/courses"
          style={{ padding: "8px 18px", background: "var(--ink)", color: "#fff", borderRadius: "100px", fontSize: ".82rem", fontWeight: 500, textDecoration: "none" }}
        >
          Courses
        </Link>
      </div>
    </nav>
  );
}
