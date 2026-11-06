export interface AvatarProps {
  src: string;
  alt?: string;
  /** 外框边长（px），默认 100（原站尺寸） */
  size?: number;
  className?: string;
}

/**
 * Avatar —— 方框描边头像
 *
 * 原站名片：12px 外圆角 + 1px 描边 + 3px 内边距 + 8px 图片圆角。
 */
export function Avatar({ src, alt = "", size = 100, className }: AvatarProps) {
  return (
    <div
      className={`shrink-0 rounded-[12px] border border-[var(--color-neutral)] bg-base-200 p-[3px] ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      <img src={src} alt={alt} className="h-full w-full rounded-[8px] object-cover" />
    </div>
  );
}
