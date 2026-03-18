"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock } from "@phosphor-icons/react";
import { formatPrice } from "@/lib/utils";

interface PurchaseButtonProps {
  courseId: string;
  courseTitle: string;
  price: number;
  currency: string;
  isLoggedIn: boolean;
  courseSlug?: string;
}

export function PurchaseButton({
  courseId,
  price,
  currency,
  isLoggedIn,
  courseSlug,
}: PurchaseButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = async () => {
    if (!isLoggedIn) {
      router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    if (price === 0) {
      // Free course — directly enroll
      setLoading(true);
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseId, free: true }),
        });
        if (!res.ok) throw new Error("Enrollment failed");
        await res.json();
        router.push(courseSlug ? `/learn/${courseSlug}` : `/dashboard`);
        router.refresh();
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Checkout failed");
      }
      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        size="lg"
        className="w-full bg-brand-gradient text-white border-0 hover:opacity-90"
        onClick={handlePurchase}
        loading={loading}
      >
        {!loading && <Lock className="w-4 h-4" />}
        {price === 0
          ? "Enroll Free"
          : isLoggedIn
          ? `Purchase for ${formatPrice(price, currency)}`
          : "Sign In to Purchase"}
        {!loading && <ArrowRight className="w-4 h-4" />}
      </Button>
      {error && (
        <p className="text-xs text-orange-red text-center">{error}</p>
      )}
      {!isLoggedIn && (
        <p className="text-xs text-ink-subtle text-center">
          You&apos;ll be redirected to sign in first.
        </p>
      )}
    </div>
  );
}
