import { assetUrl } from "../lib/assets";

export interface GameVersion {
  id: string;
  name: string;
  /** 卡面背景；CANDIDATES 暂无素材，使用占位图 */
  background: string;
  /** 游戏版本牌内的徽章；CANDIDATES 暂无素材，使用占位图 */
  badge: string;
}

export const GAME_VERSIONS: GameVersion[] = [
  {
    id: "founders",
    name: "FOUNDERS",
    background: assetUrl("assets/subscription-art-prime-batch.webp"),
    badge: assetUrl("assets/prime-batch-badge.webp"),
  },
  {
    id: "candidates",
    name: "CANDIDATES",
    background: assetUrl("placeholders/background.svg"),
    badge: assetUrl("assets/candidates-badge.png"),
  },
];

export const DEFAULT_GAME_VERSION = GAME_VERSIONS[0]!;

export function getGameVersion(id?: string) {
  return (
    GAME_VERSIONS.find((version) => version.id === id) ?? DEFAULT_GAME_VERSION
  );
}
