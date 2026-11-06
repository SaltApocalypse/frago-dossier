import type { ReactNode } from "react";

export type BadgeVariant = "success" | "info" | "accent" | "muted";

const BADGE: Record<BadgeVariant, string> = {
  success: "bg-success/20 text-success",
  info: "bg-primary/20 text-primary",
  accent: "bg-accent/20 text-accent",
  muted: "bg-white/5 text-[var(--color-text-dim)]",
};

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

/**
 * Badge —— 状态徽章
 *
 * 原站 Prime Batch 状态：2px 圆角、等宽 12px、20% 透明底色。
 */
export function Badge({ children, variant = "success", className }: BadgeProps) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1 rounded-[2px] px-1.5 py-0.5 font-mono text-xs leading-[18px] ${BADGE[variant]} ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
