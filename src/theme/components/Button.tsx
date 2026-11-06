import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "ghost";
export type ButtonSize = "sm" | "md";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const SIZE: Record<ButtonSize, string> = {
  sm: "h-8 gap-1.5 px-3 text-xs",
  md: "h-10 gap-2 px-4 text-sm",
};

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    "border-[var(--color-btn-border)] bg-[var(--color-btn-bg)] text-[var(--color-btn-fg)] hover:border-[var(--color-btn-hover-border)] hover:bg-[var(--color-btn-hover-bg)] hover:text-[var(--color-btn-hover-fg)] active:border-[var(--color-btn-active-border)] active:bg-[var(--color-btn-active-bg)] active:text-[var(--color-btn-active-fg)] disabled:border-[var(--color-btn-disabled-border)] disabled:bg-[var(--color-btn-disabled-bg)] disabled:text-[var(--color-btn-disabled-fg)]",
  ghost:
    "border-transparent bg-transparent text-[var(--color-text-dim)] hover:text-base-content active:text-[var(--color-text-faint)] disabled:text-[var(--color-btn-disabled-fg)]",
};

/**
 * Button —— 原站主按钮 / 幽灵按钮
 *
 * 40px 高、大写、0.5px 描边、4px 圆角、0.2s 过渡；
 * primary 的青绿底/描边/文字三态取自 all-styles.css。
 */
export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex select-none items-center justify-center rounded-[4px] border-[0.5px] font-primary font-medium uppercase tracking-[0.02em] transition-[color,background-color,border-color] duration-200 disabled:cursor-default ${SIZE[size]} ${VARIANT[variant]} ${className ?? ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}
