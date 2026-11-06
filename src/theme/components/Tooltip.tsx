import type { ReactNode } from "react";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Tooltip —— 纯 CSS 悬浮提示
 *
 * 基于 group hover，无 JS 定位；适用于窄屏/导出场景（不会残留）。
 */
export function Tooltip({ content, children, className }: TooltipProps) {
  return (
    <span className={`group/tooltip relative inline-flex ${className ?? ""}`}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-[2px] border border-[var(--color-neutral)] bg-base-100 px-1.5 py-0.5 font-mono text-[10px] leading-[14px] text-base-content opacity-0 shadow transition-opacity duration-150 group-hover/tooltip:opacity-100"
      >
        {content}
      </span>
    </span>
  );
}
