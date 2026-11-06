import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface LightButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/**
 * LightButton —— 紧凑文本/图标按钮
 *
 * 用于卡片内的编辑、关闭、链接等次要操作；等宽字体、弱化色，hover 提亮。
 */
export function LightButton({ children, className, ...rest }: LightButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-1 rounded-[4px] px-1.5 py-1 font-mono text-xs text-[var(--color-text-dim)] transition-colors duration-200 hover:text-base-content disabled:text-[var(--color-btn-disabled-fg)] ${className ?? ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}
