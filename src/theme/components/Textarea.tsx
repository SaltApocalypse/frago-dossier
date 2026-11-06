import type { TextareaHTMLAttributes } from "react";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * Textarea —— 暗色内嵌多行输入
 *
 * 与 Input 同源视觉；默认最小高度便于名片简介编辑。
 */
export function Textarea({ className, ...rest }: TextareaProps) {
  return (
    <textarea
      className={`min-h-24 w-full resize-y rounded-[4px] border-[0.5px] border-[var(--color-neutral)] bg-base-100 px-3 py-2 font-primary text-sm leading-6 text-base-content outline-none transition-colors duration-200 placeholder:text-[var(--color-text-faint)] focus:border-primary disabled:cursor-default disabled:text-[var(--color-btn-disabled-fg)] ${className ?? ""}`}
      {...rest}
    />
  );
}
