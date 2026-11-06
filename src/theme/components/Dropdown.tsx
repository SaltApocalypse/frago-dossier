import { useEffect, useRef, useState, type ReactNode } from "react";

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
  /** 选项图标（如军衔徽章） */
  icon?: ReactNode;
  /** 选项文字颜色（如军衔图标主色） */
  color?: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  /** 未选中时的占位文本；传空字符串即为“空白占位” */
  placeholder?: string;
  /** 触发器无障碍名称（通常传字段标签） */
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={`shrink-0 text-[var(--color-text-dim)] transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
    >
      <path
        d="M5 7.5 10 12.5 15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Dropdown —— Frago 风格下拉框
 *
 * 0.5px 描边、4px 圆角、暗色内嵌底；展开层与触发器等宽。
 * 无选项时显示空占位（触发器和菜单均不出现业务文案），便于后续接入数据。
 */
export function Dropdown({
  options,
  value,
  onChange,
  placeholder = "",
  ariaLabel,
  disabled = false,
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        title={selected?.label ?? placeholder}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        className="flex h-10 w-full items-center justify-between gap-2 rounded-[4px] border-[0.5px] border-[var(--color-neutral)] bg-base-100 px-2.5 text-left text-sm text-base-content outline-none transition-colors duration-200 hover:border-primary/50 focus-visible:border-primary focus-visible:outline-none disabled:cursor-default disabled:text-[var(--color-btn-disabled-fg)]"
      >
        <span className="flex min-w-0 items-center gap-1.5">
          {selected?.icon && (
            <span className="flex h-4 w-4 shrink-0 items-center justify-center">
              {selected.icon}
            </span>
          )}
          <span
            className="truncate"
            style={selected?.color ? { color: selected.color } : undefined}
          >
            {selected?.label ?? placeholder}
          </span>
        </span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 top-full z-40 mt-1 w-full overflow-hidden rounded-[4px] border-[0.5px] border-[var(--color-neutral)] bg-base-200 shadow-xl"
        >
          {options.length === 0 ? (
            <div className="px-2.5 py-2 font-mono text-[10px] text-[var(--color-text-faint)]">
              —
            </div>
          ) : (
            options.map((option) => {
              const active = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={active}
                  title={option.label}
                  disabled={option.disabled}
                  onClick={() => {
                    onChange?.(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 px-2.5 py-2 text-left text-sm transition-colors duration-150 ${
                    option.disabled
                      ? "cursor-default text-[var(--color-text-faint)]/50"
                      : active
                        ? "bg-primary/10 text-primary"
                        : "text-base-content hover:bg-white/5 hover:text-primary"
                  }`}
                >
                  {option.icon && (
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                      {option.icon}
                    </span>
                  )}
                  <span
                    className="truncate"
                    style={option.color ? { color: option.color } : undefined}
                  >
                    {option.label}
                  </span>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
