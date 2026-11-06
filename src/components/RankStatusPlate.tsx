import type { Rank } from "../data/ranks";

/** 把 6 位 hex 转成带透明度的 rgba，用于军衔专属渐变 */
function withAlpha(hex: string, alpha: number) {
  const value = hex.replace("#", "");
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export interface RankStatusPlateProps {
  rank: Rank;
  className?: string;
}

/**
 * RankStatusPlate —— 当前军衔状态牌
 *
 * 无积分/箭头；牌面 190px；背景与图标框渐变均取自军衔徽章主色。
 * 放在名片资料区的右侧。
 */
export function RankStatusPlate({ rank, className }: RankStatusPlateProps) {
  return (
    <div
      data-rank={rank.id}
      className={`relative flex h-[50px] w-[190px] items-center gap-2 rounded-[4px] border-[0.5px] border-[#27363a] py-[5px] pl-[5px] pr-5 ${
        className ?? ""
      }`}
      style={{
        background: `linear-gradient(rgba(217,217,217,0.03) 0%, rgba(115,115,115,0.03) 100%), radial-gradient(100% 101.1% at 0% 100%, ${withAlpha(
          rank.color,
          0.12
        )} 0%, ${withAlpha(rank.color, 0)} 100%)`,
      }}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] border border-white/10"
        style={{
          backgroundImage: `linear-gradient(${withAlpha(
            rank.color,
            0.2
          )} 0%, ${withAlpha(
            rank.color,
            0
          )} 59.24%), linear-gradient(rgba(59,77,91,0.22) 0%, rgba(22,32,40,0.22) 100%), linear-gradient(rgba(255,255,255,0.02), rgba(255,255,255,0.02))`,
        }}
      >
        <img src={rank.icon} alt="" className="h-6 w-6" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="truncate text-[16px] font-medium leading-5 text-[#b5b8bb]">
          COR3.GG
        </div>
        <div
          className="truncate text-[12px] font-medium uppercase leading-normal"
          style={{ color: rank.textColor ?? rank.color }}
        >
          {rank.name}
        </div>
      </div>
    </div>
  );
}
