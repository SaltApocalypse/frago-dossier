import { useState, type ReactNode } from "react";

import { Panel } from "./Panel";

export interface SidebarTab {
  id: string;
  /** 图标栏 title / aria-label，同时作为浮层标题 */
  label: string;
  /** 图标节点（由使用方传入，避免主题依赖图标库） */
  icon: ReactNode;
  /** 浮层内容 */
  content: ReactNode;
}

export interface SidebarProps {
  tabs: SidebarTab[];
  activeId: string;
  onActiveChange: (id: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  closeLabel?: string;
  className?: string;
}

function CloseGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M5.998 14.998 5 13.998l4-4-4-4 1-1 4 4 4-4 1 1-4 4 4 4-1 1-4-4-4 4Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Sidebar —— 左侧悬浮图标栏 + 滑出式内容面板（Frago 主题视觉）
 *
 * 交互参考 infinite-title-generator 的 Sidebar：
 * - 左上角图标栏；hover 滑出内容浮层
 * - 点击图标固定浮层；右上角关闭
 * - 移动端无 hover，点击图标直接打开
 *
 * 视觉使用 Frago 语言：4px 圆角、0.5px 描边、`bg-base-200` 浮层、
 * 信号青激活态；不再是 Infinite 的 `[ ]` 直角括号。
 */
export function Sidebar({
  tabs,
  activeId,
  onActiveChange,
  open,
  onOpenChange,
  closeLabel = "Close",
  className,
}: SidebarProps) {
  const [pinned, setPinned] = useState(false);
  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  function close() {
    setPinned(false);
    onOpenChange(false);
  }

  return (
    <aside
      className={`pointer-events-none fixed left-2 top-2 z-30 flex items-start gap-2 lg:pointer-events-auto ${
        className ?? ""
      }`}
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => {
        if (!pinned) onOpenChange(false);
      }}
    >
      {/* 图标栏：独立悬浮小卡片 */}
      <Panel
        padding="sm"
        className="pointer-events-auto bg-base-200/90 shadow-lg backdrop-blur-md"
      >
        <div role="tablist" className="flex flex-col gap-1.5">
          {tabs.map((tab) => {
            const active = tab.id === activeId;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-label={tab.label}
                title={tab.label}
                aria-selected={active}
                onClick={() => {
                  onActiveChange(tab.id);
                  setPinned(true);
                  onOpenChange(true);
                }}
                className={`flex h-10 w-10 items-center justify-center rounded-[4px] border-[0.5px] transition-colors duration-200 ${
                  active
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-transparent text-[var(--color-text-dim)] hover:bg-white/5 hover:text-base-content"
                }`}
              >
                {tab.icon}
              </button>
            );
          })}
        </div>
      </Panel>

      {/* 内容浮层 */}
      <div
        className={`pointer-events-none w-80 max-w-[calc(100vw_-_5rem)] transition-all duration-300 ${
          open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <Panel
          padding="md"
          className={`shadow-2xl backdrop-blur-md ${
            open ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
              {activeTab?.label ?? ""}
            </h2>
            <button
              type="button"
              aria-label={closeLabel}
              onClick={close}
              className="flex h-6 w-6 items-center justify-center rounded-[2px] text-[var(--color-text-dim)] transition-colors hover:bg-white/5 hover:text-base-content"
            >
              <CloseGlyph />
            </button>
          </div>

          <div
            key={activeId}
            role="tabpanel"
            aria-label={activeTab?.label}
            className="animate-fade-in"
          >
            {activeTab?.content}
          </div>
        </Panel>
      </div>
    </aside>
  );
}
