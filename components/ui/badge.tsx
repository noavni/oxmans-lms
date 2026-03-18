import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "teal" | "blue" | "purple" | "pink" | "orange" | "green";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-section text-ink-mid border-rule",
  teal: "bg-teal-light/15 text-teal-mid border-teal-light/30",
  blue: "bg-blue-deep/15 text-blue-deep border-blue-deep/30",
  purple: "bg-purple/15 text-purple border-purple/30",
  pink: "bg-pink/15 text-pink border-pink/30",
  orange: "bg-orange-red/15 text-orange-red border-orange-red/30",
  green: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-mono font-medium rounded-full border",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
