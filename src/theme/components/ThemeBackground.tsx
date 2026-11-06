export interface ThemeBackgroundProps {
  className?: string;
}

/**
 * ThemeBackground —— 固定层页面背景
 *
 * 暗底 + 顶部轻微径向提亮（原站页面底色），装饰层不拦截交互。
 */
export function ThemeBackground({ className }: ThemeBackgroundProps) {
  return (
    <div
      aria-hidden
      className={`bg-frago-vignette pointer-events-none fixed inset-0 -z-10 ${className ?? ""}`}
    />
  );
}
