import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(...inputs);
}

export function formatPrice(priceInCents: number, currency = "ILS"): string {
  const amount = priceInCents / 100;
  if (currency === "ILS") {
    return `₪${amount.toFixed(0)}`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
  return `${minutes}:${String(secs).padStart(2, "0")}`;
}

export function getLevelLabel(level: string): string {
  const labels: Record<string, string> = {
    BEGINNER: "Secondary",
    INTERMEDIATE: "A-Level",
    ADVANCED: "University",
  };
  return labels[level] ?? level;
}

export function getLevelColor(level: string): string {
  const colors: Record<string, string> = {
    BEGINNER: "bg-teal-light/20 text-teal-mid border-teal-light/30",
    INTERMEDIATE: "bg-blue-deep/20 text-blue-deep border-blue-deep/30",
    ADVANCED: "bg-purple/20 text-purple border-purple/30",
  };
  return colors[level] ?? "bg-rule text-ink-mid border-rule";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
