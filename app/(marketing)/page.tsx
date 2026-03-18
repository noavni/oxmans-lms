"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  ArrowRight, Play, ChartLineUp, BookOpen, Star,
  Monitor, ClipboardText, Globe, Lightning, Certificate, Brain,
} from "@phosphor-icons/react";

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const SUBJECTS = [
  "Calculus","Linear Algebra","Trigonometry","Statistics",
  "Differential Equations","Number Theory","Probability",
  "Complex Numbers","Vectors","Algebra","Sequences & Series","Geometry",
];

const FEATURES = [
  { icon: Play,          title: "Expert Video Lessons",      description: "High-quality recorded lessons you can watch, pause, and rewatch as many times as you need — on any device.",          color: "#2da8c8", iconBg: "rgba(45,168,200,.1)",  accent: "linear-gradient(90deg,#5ecfcf,#1a6fa8)" },
  { icon: Brain,         title: "Concept-First Teaching",    description: "We build intuition from the ground up. Every theorem is explained from first principles before any formula appears.", color: "#6b3fa0", iconBg: "rgba(107,63,160,.1)", accent: "linear-gradient(90deg,#6b3fa0,#e060a8)" },
  { icon: ClipboardText, title: "Progress Tracking",         description: "Visual dashboards show exactly which lessons you've completed, what's next, and how far you've come.",                color: "#e84830", iconBg: "rgba(232,72,48,.1)",  accent: "linear-gradient(90deg,#e060a8,#e84830)" },
  { icon: Monitor,       title: "Structured Curriculum",     description: "Each course is divided into chapters and lessons — a clear path from first principles to exam-ready mastery.",      color: "#2da8c8", iconBg: "rgba(45,168,200,.1)",  accent: "linear-gradient(90deg,#5ecfcf,#1a6fa8)" },
  { icon: Certificate,   title: "University-Grade Rigor",    description: "Content aligned with international syllabi, from secondary school through graduate-level mathematics.",             color: "#6b3fa0", iconBg: "rgba(107,63,160,.1)", accent: "linear-gradient(90deg,#6b3fa0,#e060a8)" },
  { icon: Lightning,     title: "Lifetime Access",           description: "Purchase once, access forever. Your courses, your pace — revisit any lesson whenever you need a refresher.",        color: "#e060a8", iconBg: "rgba(224,96,168,.1)", accent: "linear-gradient(90deg,#e060a8,#e84830)" },
];

const STEPS = [
  { n: "1", title: "Browse Courses",    desc: "Explore courses by level — Secondary, A-Level, University, or Competition.",  grad: "linear-gradient(135deg,#5ecfcf,#1a6fa8)" },
  { n: "2", title: "Enrol",             desc: "Purchase once for lifetime access. Free preview lessons available on every course.", grad: "linear-gradient(135deg,#1a6fa8,#6b3fa0)" },
  { n: "3", title: "Watch & Learn",     desc: "Work through structured chapters at your own pace, on any device.",            grad: "linear-gradient(135deg,#6b3fa0,#e060a8)" },
  { n: "4", title: "Track Progress",    desc: "Mark lessons complete and watch your mastery grow across every topic.",        grad: "linear-gradient(135deg,#e060a8,#e84830)" },
];

const CURRICULUM = [
  { level: "Secondary",    title: "Foundations & GCSE",    accent: "var(--tm)", topics: ["Number & algebra fundamentals","Ratio, proportion & rates","Geometry & trigonometry","Statistics & probability","GCSE exam preparation"] },
  { level: "A-Level",      title: "Pure & Applied Maths",  accent: "var(--pu)", topics: ["Differentiation & integration","Trigonometric identities","Mechanics & kinematics","Statistics & distributions","A-Level past paper drills"] },
  { level: "University",   title: "Higher Mathematics",    accent: "var(--pk)", topics: ["Real & complex analysis","Linear algebra & matrices","Differential equations (ODE/PDE)","Probability theory","Proof techniques"] },
  { level: "Competitions", title: "Olympiad Preparation",  accent: "var(--or)", topics: ["AMC / AIME strategies","Combinatorics & graph theory","Number theory proofs","Inequalities & optimisation","Mock competition practice"] },
];

const TESTIMONIALS = [
  { name: "Sarah M.", role: "Engineering, Tel Aviv University", initials: "S", grad: "linear-gradient(135deg,#5ecfcf,#1a6fa8)", text: "I went from failing calculus to finishing the semester with an A. The explanations are unlike anything I found elsewhere — intuitive and completely rigorous." },
  { name: "Daniel K.", role: "A-Level student",                 initials: "D", grad: "linear-gradient(135deg,#6b3fa0,#e060a8)", text: "The structured approach changed how I think about maths entirely. My A-Level grade jumped two full grades after working through the calculus course." },
  { name: "Noa R.",    role: "High-school, competition track",  initials: "N", grad: "linear-gradient(135deg,#e84830,#e060a8)", text: "Qualified for the national maths olympiad after working through the problem-solving course. The depth and clarity here is unmatched." },
];

const STATS = [
  { value: "97%",   label: "Grade improvement" },
  { value: "400+",  label: "Video lessons" },
  { value: "8 yrs", label: "Teaching experience" },
  { value: "4.9★",  label: "Average rating" },
];

/* ─── Page ──────────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  /* Single global observer — mirrors the HTML reference exactly */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("on"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const H = "var(--font-playfair),Georgia,serif";
  const M = "var(--font-dm-mono),monospace";

  return (
    <div style={{ background: "var(--bg)", position: "relative" }}>

      {/* ── Full-page grid (sits behind all sections) ───────────────────────── */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "linear-gradient(rgba(0,0,0,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.022) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section style={{ minHeight: "100dvh", display: "grid", placeItems: "center", padding: "140px 0 100px", position: "relative", zIndex: 1, overflow: "hidden" }}>
        {/* Conic orb */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-150px", right: "-200px", width: "700px", height: "700px", background: "conic-gradient(from 200deg,rgba(94,207,207,.07),rgba(107,63,160,.06),rgba(224,96,168,.05),rgba(232,72,48,.04),rgba(94,207,207,.07))", borderRadius: "50%", filter: "blur(2px)", animation: "spin 32s linear infinite" }} />
          <div style={{ position: "absolute", bottom: "-200px", left: "-100px", width: "500px", height: "500px", background: "radial-gradient(circle,rgba(94,207,207,.07) 0%,transparent 70%)", borderRadius: "50%" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "860px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "6px 16px", borderRadius: "100px", background: "rgba(94,207,207,.1)", border: "1px solid rgba(94,207,207,.25)", marginBottom: "36px", animation: "fadeUp .8s ease both" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--tm)", animation: "pulse 2s ease infinite", display: "block" }} />
            <span style={{ fontFamily: M, fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--tm)" }}>Mathematics Video Courses</span>
          </div>

          <h1 style={{ fontFamily: H, fontSize: "clamp(3rem,7vw,5.5rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-.03em", color: "var(--ink)", marginBottom: "28px", animation: "fadeUp .8s .12s ease both" }}>
            Master mathematics.<br />
            <em className="gradient-text" style={{ fontStyle: "italic" }}>One theorem at a time.</em>
          </h1>

          <p style={{ fontSize: "clamp(1rem,2vw,1.2rem)", fontWeight: 300, lineHeight: 1.65, color: "var(--im)", maxWidth: "560px", margin: "0 auto 48px", animation: "fadeUp .8s .24s ease both" }}>
            Expert-led video courses that build genuine mathematical understanding — from secondary school through to university and olympiad level.
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", flexWrap: "wrap", animation: "fadeUp .8s .36s ease both" }}>
            <Link href="/courses" className="btn-primary">
              Browse Courses
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
            <Link href="/register" className="btn-secondary">Create Free Account</Link>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "48px", marginTop: "80px", paddingTop: "48px", borderTop: "1px solid var(--ru)", animation: "fadeUp .8s .48s ease both", flexWrap: "wrap" }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <span className="gradient-text" style={{ fontFamily: H, fontSize: "2.2rem", fontWeight: 700, lineHeight: 1, display: "block", marginBottom: "6px" }}>{s.value}</span>
                <span style={{ fontSize: ".78rem", color: "var(--is)", letterSpacing: ".04em" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────────────── */}
      <section id="features" style={{ padding: "120px 0", position: "relative", zIndex: 1 }}>
        <div className="wrap">
          <div className="rv" style={{ marginBottom: "72px" }}>
            <span className="lbl" style={{ display: "block", marginBottom: "14px" }}>Platform Features</span>
            <h2 style={{ fontFamily: H, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-.025em", color: "var(--ink)", marginBottom: "16px" }}>
              Everything you need<br />to excel at maths
            </h2>
            <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.7, color: "var(--im)", maxWidth: "520px" }}>
              A structured learning environment built around how mathematical understanding actually develops.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2px", background: "var(--ru)", border: "1px solid var(--ru)", borderRadius: "24px", overflow: "hidden" }}>
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rv"
                  style={{ background: "var(--bg)", padding: "48px 40px", position: "relative", overflow: "hidden", transition: "background .3s", transitionDelay: `${i * 60}ms` } as React.CSSProperties}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.background = "#fff";
                    (el.querySelector(".fc-accent") as HTMLElement).style.opacity = "1";
                    (el.querySelector(".fc-icon") as HTMLElement).style.transform = "scale(1.08) rotate(-4deg)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.background = "var(--bg)";
                    (el.querySelector(".fc-accent") as HTMLElement).style.opacity = "0";
                    (el.querySelector(".fc-icon") as HTMLElement).style.transform = "none";
                  }}
                >
                  <div className="fc-accent" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: f.accent, opacity: 0, transition: "opacity .3s" }} />
                  <div className="fc-icon" style={{ width: 48, height: 48, borderRadius: "12px", display: "grid", placeItems: "center", marginBottom: "24px", background: f.iconBg, transition: "transform .3s cubic-bezier(.2,.8,.4,1)" }}>
                    <Icon weight="duotone" style={{ width: 22, height: 22, color: f.color }} />
                  </div>
                  <h3 style={{ fontFamily: H, fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-.015em", color: "var(--ink)", marginBottom: "12px" }}>{f.title}</h3>
                  <p style={{ fontSize: ".88rem", lineHeight: 1.65, color: "var(--is)", fontWeight: 300 }}>{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────────────── */}
      <section style={{ padding: "120px 0", position: "relative", zIndex: 1, background: "linear-gradient(to bottom, rgba(244,243,239,0) 0%, rgba(244,243,239,.92) 12%, rgba(244,243,239,.92) 88%, rgba(244,243,239,0) 100%)" }}>
        <div className="wrap">
          <div className="rv" style={{ marginBottom: "72px", textAlign: "center" }}>
            <span className="lbl" style={{ display: "block", marginBottom: "14px" }}>How It Works</span>
            <h2 style={{ fontFamily: H, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-.025em", color: "var(--ink)", marginBottom: "16px" }}>Four steps to clarity</h2>
            <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.7, color: "var(--im)", maxWidth: "520px", margin: "0 auto" }}>From your first visit to exam-ready confidence.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, position: "relative" }}>
            <div aria-hidden style={{ position: "absolute", top: "32px", left: "calc(12.5% + 16px)", right: "calc(12.5% + 16px)", height: "1px", background: "linear-gradient(90deg,#5ecfcf,#6b3fa0,#e060a8,#f06040)", zIndex: 0 }} />
            {STEPS.map((s, i) => (
              <div key={s.n} className={`rv${i > 0 ? " d" + i : ""}`} style={{ padding: "0 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", display: "grid", placeItems: "center", margin: "0 auto 28px", background: s.grad, fontFamily: H, fontSize: "1.5rem", fontWeight: 700, color: "#fff" }}>{s.n}</div>
                <h3 style={{ fontFamily: H, fontSize: "1.1rem", fontWeight: 600, marginBottom: "10px", color: "var(--ink)" }}>{s.title}</h3>
                <p style={{ fontSize: ".84rem", lineHeight: 1.6, color: "var(--is)", fontWeight: 300 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Curriculum ─────────────────────────────────────────────────────── */}
      <section id="subjects" style={{ padding: "120px 0", position: "relative", zIndex: 1 }}>
        <div className="wrap">
          <div className="rv" style={{ marginBottom: "72px" }}>
            <span className="lbl" style={{ display: "block", marginBottom: "14px" }}>Curriculum</span>
            <h2 style={{ fontFamily: H, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-.025em", color: "var(--ink)", marginBottom: "16px" }}>What we cover</h2>
            <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.7, color: "var(--im)", maxWidth: "520px" }}>From secondary school foundations to university-level mathematics and olympiad preparation.</p>
          </div>
        </div>

        {/* Marquee */}
        <div style={{ overflow: "hidden", marginBottom: "80px", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "120px", background: "linear-gradient(90deg,var(--bg),transparent)", zIndex: 2 }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "120px", background: "linear-gradient(-90deg,var(--bg),transparent)", zIndex: 2 }} />
          <div className="marquee-track">
            {[...SUBJECTS, ...SUBJECTS].map((s, i) => (
              <span key={i} style={{ padding: "10px 24px", borderRadius: "100px", whiteSpace: "nowrap", fontSize: ".82rem", letterSpacing: ".02em", border: "1.5px solid var(--ru)", color: "var(--im)", background: "#fff", margin: "0 8px", display: "inline-block" }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {CURRICULUM.map((c) => (
              <div
                key={c.level}
                className="rv"
                style={{ padding: "36px", borderRadius: "24px", background: "#fff", border: "1px solid var(--ru)", boxShadow: "var(--ss)", transition: "box-shadow .3s,transform .3s", position: "relative", overflow: "hidden" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "var(--sm)"; el.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "var(--ss)"; el.style.transform = "none"; }}
              >
                <div style={{ position: "absolute", top: 0, right: 0, width: "120px", height: "120px", borderRadius: "0 0 0 120px", background: c.accent, opacity: .08 }} />
                <span style={{ fontFamily: M, fontSize: ".68rem", letterSpacing: ".14em", textTransform: "uppercase", padding: "4px 12px", borderRadius: "100px", background: "var(--bs)", color: "var(--is)", display: "inline-block", marginBottom: "18px" }}>{c.level}</span>
                <h3 style={{ fontFamily: H, fontSize: "1.3rem", fontWeight: 600, marginBottom: "14px", color: "var(--ink)" }}>{c.title}</h3>
                <ul style={{ listStyle: "none" }}>
                  {c.topics.map((t) => (
                    <li key={t} style={{ fontSize: ".84rem", color: "var(--im)", padding: "7px 0", borderBottom: "1px solid var(--bs)", display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--tm)", flexShrink: 0, display: "block" }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      <section id="testimonials" style={{ padding: "120px 0", position: "relative", zIndex: 1, background: "#0f0e0c", overflow: "hidden" }}>
        {/* Subtle white grid */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
        {/* Conic accent */}
        <div aria-hidden style={{ position: "absolute", top: "-120px", right: "-120px", width: "480px", height: "480px", background: "conic-gradient(from 200deg,rgba(94,207,207,.06),rgba(107,63,160,.05),rgba(224,96,168,.04),rgba(94,207,207,.06))", borderRadius: "50%", filter: "blur(2px)", animation: "spin 40s linear infinite", pointerEvents: "none" }} />

        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="rv" style={{ marginBottom: "64px", textAlign: "center" }}>
            <span className="lbl" style={{ display: "block", marginBottom: "14px", color: "rgba(255,255,255,.35)" }}>Student Reviews</span>
            <h2 style={{ fontFamily: H, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-.025em", color: "#fff", marginBottom: "16px" }}>Results that speak</h2>
            <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,.45)", maxWidth: "520px", margin: "0 auto" }}>Real outcomes from students who committed to the process.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className={`rv${i > 0 ? " d" + i : ""}`}
                style={{ padding: "32px", borderRadius: "20px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", transition: "background .3s,transform .3s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = "rgba(255,255,255,.09)"; el.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = "rgba(255,255,255,.05)"; el.style.transform = "none"; }}
              >
                <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} weight="fill" style={{ width: 13, height: 13, color: "var(--co)" }} />)}
                </div>
                <p style={{ fontFamily: H, fontSize: "1.05rem", fontStyle: "italic", lineHeight: 1.65, color: "rgba(255,255,255,.82)", marginBottom: "28px" }}>&ldquo;{t.text}&rdquo;</p>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", display: "grid", placeItems: "center", background: t.grad, fontFamily: H, fontSize: "1rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>{t.initials}</div>
                  <div>
                    <div style={{ fontSize: ".87rem", fontWeight: 500, color: "rgba(255,255,255,.88)" }}>{t.name}</div>
                    <div style={{ fontSize: ".75rem", color: "rgba(255,255,255,.38)", marginTop: "2px" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section id="cta" style={{ padding: "120px 0", position: "relative", zIndex: 1, overflow: "hidden", background: "linear-gradient(to bottom, rgba(244,243,239,0) 0%, rgba(244,243,239,.92) 12%, rgba(244,243,239,.92) 88%, rgba(244,243,239,0) 100%)" }}>
        <div aria-hidden style={{ position: "absolute", top: "-200px", left: "50%", transform: "translateX(-50%)", width: "800px", height: "800px", borderRadius: "50%", background: "radial-gradient(circle,rgba(94,207,207,.06) 0%,rgba(107,63,160,.04) 40%,transparent 70%)", pointerEvents: "none" }} />
        <div className="rv" style={{ textAlign: "center", position: "relative", zIndex: 1, maxWidth: "600px", margin: "0 auto", padding: "0 40px" }}>
          <span className="lbl" style={{ display: "block", marginBottom: "16px" }}>Start Learning Today</span>
          <h2 style={{ fontFamily: H, fontSize: "clamp(2.2rem,5vw,3.8rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-.03em", color: "var(--ink)", marginBottom: "20px" }}>
            Ready to solve for <em className="gradient-text">x</em>?
          </h2>
          <p style={{ fontSize: "1.05rem", fontWeight: 300, color: "var(--im)", lineHeight: 1.65, marginBottom: "44px" }}>
            Browse our course catalogue and start your first free preview lesson today — no account required.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/courses" className="btn-primary">
              Browse Courses
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
            <Link href="/register" className="btn-secondary">Create Free Account</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
