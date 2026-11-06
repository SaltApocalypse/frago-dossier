export interface SegmentedOption {
  value: string;
  label: string;
}

export interface SegmentedProps {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/**
 * Segmented —— Frago 风格分段选择
 *
 * 0.5px 描边外框 + 2px 内块；选中项为信号青淡底。
 * 适合语言、模板等少量互斥选项。
 */
export function Segmented({ options, value, onChange, className }: SegmentedProps) {
  return (
    <div
      className={`inline-flex rounded-[4px] border-[0.5px] border-[var(--color-neutral)] bg-base-100/60 p-0.5 ${
        className ?? ""
      }`}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`h-7 rounded-[2px] px-2.5 font-mono text-[10px] tracking-[0.1em] transition-colors duration-200 ${
              active
                ? "bg-primary/15 text-primary"
                : "text-[var(--color-text-dim)] hover:text-base-content"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
