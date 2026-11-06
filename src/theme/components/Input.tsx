import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

/**
 * Input —— 暗色内嵌输入框
 *
 * 0.5px 边框、4px 圆角、聚焦切主色；占位符弱化。
 */
export function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={`h-10 w-full rounded-[4px] border-[0.5px] border-[var(--color-neutral)] bg-base-100 px-3 font-primary text-sm text-base-content outline-none transition-colors duration-200 placeholder:text-[var(--color-text-faint)] focus:border-primary disabled:cursor-default disabled:text-[var(--color-btn-disabled-fg)] ${className ?? ""}`}
      {...rest}
    />
  );
}
