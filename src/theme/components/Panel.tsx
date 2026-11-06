import type { ReactNode } from "react";

export type PanelPadding = "none" | "sm" | "md" | "lg";

const PADDING: Record<PanelPadding, string> = {
  none: "",
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
};

export interface PanelProps {
  children: ReactNode;
  className?: string;
  /** 焦点/高亮态：内嵌 1px 主色描边 */
  active?: boolean;
  padding?: PanelPadding;
}

/**
 * Panel —— 卡面 / 内容面板
 *
 * 原站名片卡面：`#162028` + 2% 白叠层、0.5px `#434a51` 描边、4px 圆角。
 * 定位/尺寸/布局由使用方通过 className 传入。
 */
export function Panel({ children, className, active = false, padding = "none" }: PanelProps) {
  return (
    <div
      className={`relative rounded-[4px] border-[0.5px] border-[var(--color-neutral)] bg-base-200 bg-[linear-gradient(0deg,rgba(255,255,255,0.02),rgba(255,255,255,0.02))] text-base-content ${PADDING[padding]} ${
        active ? "ring-1 ring-inset ring-primary" : ""
      } ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
