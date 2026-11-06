import { assetUrl } from "../lib/assets";

export interface Rank {
  id: string;
  tier: string;
  name: string;
  /** 图标主色；军衔文字颜色与之一致 */
  color: string;
  /** 深色军衔（如 FOUNDATION）用于文字的可读浅色；缺省时使用 color */
  textColor?: string;
  icon: string;
}

export const RANKS: Rank[] = [
  {
    id: "forerunner",
    tier: "I",
    name: "FORERUNNER",
    color: "#9768FF",
    icon: assetUrl("ranks/forerunner.svg"),
  },
  {
    id: "the-pillar",
    tier: "II",
    name: "THE PILLAR",
    color: "#FF944C",
    icon: assetUrl("ranks/the_pillar.svg"),
  },
  {
    id: "torchbearer",
    tier: "III",
    name: "TORCHBEARER",
    color: "#FFE368",
    icon: assetUrl("ranks/torchbearer.svg"),
  },
  {
    id: "pathfinder",
    tier: "IV",
    name: "PATHFINDER",
    color: "#76FFE8",
    icon: assetUrl("ranks/pathfinder.svg"),
  },
  {
    id: "foundation",
    tier: "V",
    name: "FOUNDATION",
    color: "#333738",
    textColor: "#9AA0A3",
    icon: assetUrl("ranks/foundation.svg"),
  },
];

/** 默认军衔：Tier V / FOUNDATION */
export const DEFAULT_RANK = RANKS.find((rank) => rank.id === "foundation")!;

export function getRank(id?: string) {
  return RANKS.find((rank) => rank.id === id) ?? DEFAULT_RANK;
}

export function rankLabel(rank: Rank) {
  return `Tier ${rank.tier} : ${rank.name}`;
}
