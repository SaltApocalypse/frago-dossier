export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** 状态文案，默认 ON / OFF */
  labels?: { on?: string; off?: string };
  className?: string;
}

/**
 * Toggle —— Frago 风格开关
 *
 * 0.5px 描边、3px 轨道圆角、方形滑块；开启时轨道/滑块切信号青。
 * 右侧带等宽 ON/OFF 文本，适合设置面板的紧凑行。
 */
export function Toggle({ checked, onChange, labels = {}, className }: ToggleProps) {
  const onLabel = labels.on ?? "ON";
  const offLabel = labels.off ?? "OFF";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`inline-flex h-8 items-center gap-2 rounded-[4px] px-1 font-mono text-[10px] tracking-[0.14em] transition-colors duration-200 ${
        checked ? "text-primary" : "text-[var(--color-text-dim)]"
      } ${className ?? ""}`}
    >
      <span
        aria-hidden
        className={`relative h-4 w-8 rounded-[3px] border-[0.5px] transition-colors duration-200 ${
          checked
            ? "border-primary/60 bg-primary/15"
            : "border-[var(--color-neutral)] bg-base-100"
        }`}
      >
        <span
          aria-hidden
          className={`absolute top-1/2 h-2.5 w-3 -translate-y-1/2 rounded-[1px] transition-all duration-200 ${
            checked
              ? "left-[15px] bg-primary"
              : "left-[3px] bg-[var(--color-text-faint)]"
          }`}
        />
      </span>
      <span>{checked ? onLabel : offLabel}</span>
    </button>
  );
}
