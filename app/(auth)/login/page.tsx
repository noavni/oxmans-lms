"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { GraduationCap, EnvelopeSimple, Lock, Eye, EyeSlash } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(
    error === "CredentialsSignin" ? "Invalid email or password." : null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setFormError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formError && (
        <div className="bg-orange-red/10 border border-orange-red/20 rounded-xl px-4 py-3 text-sm text-orange-red">
          {formError}
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-medium text-ink-mid">
          Email address
        </label>
        <div className="relative">
          <EnvelopeSimple className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-subtle" />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            className="w-full pl-10 pr-4 h-11 rounded-xl border border-rule bg-section text-ink text-sm placeholder:text-ink-subtle focus:outline-none focus:border-purple/50 focus:ring-2 focus:ring-purple/10 transition-all"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-sm font-medium text-ink-mid">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-subtle" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full pl-10 pr-11 h-11 rounded-xl border border-rule bg-section text-ink text-sm placeholder:text-ink-subtle focus:outline-none focus:border-purple/50 focus:ring-2 focus:ring-purple/10 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-subtle hover:text-ink transition-colors"
          >
            {showPassword ? (
              <EyeSlash className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-brand-gradient text-white border-0"
        loading={loading}
      >
        Sign In
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-rule" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-page px-3 text-ink-subtle">or</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        size="lg"
        className="w-full"
        onClick={() => signIn("google", { callbackUrl })}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </Button>
    </form>
  );
}

export default function LoginPage() {
  const H = "var(--font-playfair),Georgia,serif";
  const M = "var(--font-dm-mono),monospace";

  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "64px 20px", overflow: "hidden" }}>

      {/* Full-page grid — identical to landing */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "linear-gradient(rgba(0,0,0,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.022) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />

      {/* Conic orb — top-right */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-150px", right: "-200px", width: "700px", height: "700px", background: "conic-gradient(from 200deg,rgba(94,207,207,.07),rgba(107,63,160,.06),rgba(224,96,168,.05),rgba(232,72,48,.04),rgba(94,207,207,.07))", borderRadius: "50%", filter: "blur(2px)", animation: "spin 32s linear infinite" }} />
        {/* Radial orb — bottom-left */}
        <div style={{ position: "absolute", bottom: "-200px", left: "-100px", width: "500px", height: "500px", background: "radial-gradient(circle,rgba(94,207,207,.07) 0%,transparent 70%)", borderRadius: "50%" }} />
      </div>

      {/* Card */}
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "448px", animation: "fadeUp .8s ease both" }}>

        {/* Logo + heading */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none", marginBottom: "24px" }}>
            <div style={{ width: 40, height: 40, borderRadius: "12px", background: "linear-gradient(135deg,#5ecfcf,#1a6fa8,#6b3fa0)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GraduationCap weight="bold" style={{ width: 20, height: 20, color: "#fff" }} />
            </div>
            <span style={{ fontFamily: H, fontWeight: 700, fontSize: "1.4rem", color: "var(--ink)" }}>Oxman&apos;s</span>
          </Link>

          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "6px 16px", borderRadius: "100px", background: "rgba(94,207,207,.1)", border: "1px solid rgba(94,207,207,.25)", marginBottom: "20px", animation: "fadeUp .8s .1s ease both" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--tm)", animation: "pulse 2s ease infinite", display: "block" }} />
            <span style={{ fontFamily: M, fontSize: ".68rem", letterSpacing: ".12em", textTransform: "uppercase" as const, color: "var(--tm)" }}>Mathematics Video Courses</span>
          </div>

          <h1 style={{ fontFamily: H, fontSize: "2rem", fontWeight: 700, letterSpacing: "-.025em", color: "var(--ink)", marginBottom: "8px", animation: "fadeUp .8s .15s ease both" }}>
            Welcome back
          </h1>
          <p style={{ fontSize: ".9rem", color: "var(--is)", fontWeight: 300, animation: "fadeUp .8s .2s ease both" }}>
            Sign in to continue your learning journey
          </p>
        </div>

        {/* Form card */}
        <div style={{ background: "#fff", borderRadius: "24px", border: "1px solid var(--ru)", padding: "32px", boxShadow: "0 4px 32px rgba(15,14,12,.06)", animation: "fadeUp .8s .25s ease both" }}>
          <Suspense fallback={<div className="space-y-4 animate-pulse" />}>
            <LoginForm />
          </Suspense>
        </div>

        <p style={{ textAlign: "center", fontSize: ".85rem", color: "var(--is)", marginTop: "24px", animation: "fadeUp .8s .35s ease both" }}>
          Don&apos;t have an account?{" "}
          <Link href="/register" style={{ color: "var(--pu)", fontWeight: 500, textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
          >
            Create one free
          </Link>
        </p>
      </div>

    </div>
  );
}
