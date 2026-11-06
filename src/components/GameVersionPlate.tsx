import type { GameVersion } from "../data/gameVersions";

export interface GameVersionPlateProps {
  version: GameVersion;
  className?: string;
}

/**
 * GameVersionPlate —— 游戏版本牌（FOUNDERS / CANDIDATES）
 *
 * 放在 Prime Batch 卡底部原来徽章的位置：内嵌版本徽章 + 版本名。
 * 无激活字样、无箭头；牌面 190px。
 */
export function GameVersionPlate({
  version,
  className,
}: GameVersionPlateProps) {
  return (
    <div
      data-version={version.id}
      className={`relative flex h-[50px] w-[190px] shrink-0 items-center gap-2 rounded-[4px] border-[0.5px] border-[#27363a] py-[3px] pl-[5px] pr-[15px] ${
        className ?? ""
      }`}
      style={{
        background:
          "linear-gradient(rgba(217,217,217,0.03) 0%, rgba(115,115,115,0.03) 100%), radial-gradient(100% 101.1% at 0% 100%, rgba(151,104,255,0.1) 0%, rgba(151,104,255,0) 100%)",
      }}
    >
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[4px]">
        <img
          src={version.badge}
          alt=""
          className="block h-full w-full object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="truncate text-[16px] font-medium leading-5 text-[#b5b8bb]">
          {version.name}
        </div>
      </div>
    </div>
  );
}
