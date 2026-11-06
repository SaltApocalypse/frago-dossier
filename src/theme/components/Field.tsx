import type { ReactNode } from "react";

export interface FieldProps {
  label: ReactNode;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Field —— 纵向字段：等宽小标签 + 控件（控件占满宽度） */
export function Field({ label, hint, children, className }: FieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 py-2 ${className ?? ""}`}>
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
        {label}
      </span>
      {children}
      {hint && (
        <span className="text-[10px] leading-4 text-[var(--color-text-faint)]">
          {hint}
        </span>
      )}
    </div>
  );
}

export interface FieldRowProps {
  label: ReactNode;
  children: ReactNode;
  className?: string;
}

/** FieldRow —— 横向字段：左标签、右控件（适合开关/分段/上传） */
export function FieldRow({ label, children, className }: FieldRowProps) {
  return (
    <div
      className={`flex items-center justify-between gap-3 py-2 ${className ?? ""}`}
    >
      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-dim)]">
        {label}
      </span>
      <div className="flex min-w-0 items-center gap-1.5">{children}</div>
    </div>
  );
}
