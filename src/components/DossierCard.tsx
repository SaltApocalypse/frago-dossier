import type { RefObject } from "react";
import { useTranslation } from "react-i18next";

import { getGameVersion } from "../data/gameVersions";
import { getRank } from "../data/ranks";
import { assetUrl } from "../lib/assets";
import type { DossierData } from "../store/dossierStore";
import { GameVersionPlate } from "./GameVersionPlate";
import { RankStatusPlate } from "./RankStatusPlate";

export interface DossierCardProps {
  data: DossierData;
  cardRef?: RefObject<HTMLElement | null>;
}

/**
 * DossierCard —— 原站名片复刻
 *
 * 仅保留资料区与 Prime Batch 卡；标题栏、兑换区、编辑图标已移除。
 * 头像偏移严格按参考组件：
 *  - 桌面：margin-left 8px、margin-top -32px
 *  - 移动端：margin-left 4px、margin-top -32px（参考未覆盖 margin-top）
 */
export function DossierCard({
  data,
  cardRef,
}: DossierCardProps) {
  const { t } = useTranslation();
  const rank = getRank(data.rank);
  const version = getGameVersion(data.gameVersion);

  return (
    <section
      ref={cardRef}
      aria-label={t("dossier.title")}
      className="relative flex max-h-[648px] w-full max-w-[920px] flex-col overflow-hidden rounded-[4px] border border-[#27363a] bg-base-200 font-primary text-base-content"
    >
      <span className="pointer-events-none absolute right-4 top-3 z-[3] select-none whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.18em] text-white/35 sm:text-[9px]">
        CREATED BY FRAGO DOSSIER · UNOFFICIAL FAN-MADE
      </span>

      <div className="flex flex-1 flex-col gap-0 overflow-auto px-4 pb-4 pt-8 max-[560px]:px-3 max-[560px]:pb-3 max-[560px]:pt-6">
        {/* Profile */}
        <section
          aria-label={t("dossier.nickname")}
          className="grid w-full grid-cols-[100px_minmax(0,1fr)_auto] gap-x-4 rounded-[4px] border-[0.5px] border-[#434a51] bg-base-200 bg-[linear-gradient(0deg,rgba(255,255,255,0.02),rgba(255,255,255,0.02))] py-2 pl-2 pr-[19.5px] max-[560px]:grid-cols-[76px_minmax(0,1fr)] max-[560px]:gap-x-3"
        >
          <div className="-mt-8 ml-2 flex h-[100px] w-[100px] shrink-0 items-center justify-center rounded-[12px] border border-[#434a51] bg-base-200 p-[3px] max-[560px]:ml-1 max-[560px]:h-[76px] max-[560px]:w-[76px]">
            <img
              src={data.avatar}
              alt=""
              className="block h-full w-full rounded-[8px] object-cover"
            />
          </div>

          <div className="mt-2.5 min-w-0 overflow-hidden">
            <div className="mb-0.5 font-mono text-xs leading-[18px] tracking-[0.1px] text-[#7d8182]">
              {t("dossier.nickname")}
            </div>
            <span
              className="block min-w-0 truncate text-2xl font-medium leading-8 max-[560px]:text-xl"
              title={data.nickname}
            >
              {data.nickname}
            </span>
          </div>

          <RankStatusPlate
            rank={rank}
            className="self-center max-[560px]:col-start-2 max-[560px]:row-start-2 max-[560px]:mt-2 max-[560px]:justify-self-end"
          />
        </section>

        {/* Prime Batch card */}
        <section
          aria-label={t("dossier.primeBatch")}
          className="relative mt-1 h-[278px] min-h-[220px] w-full overflow-hidden rounded-[4px] bg-[#090909] max-[560px]:h-[230px]"
        >
          <img
            src={version.background}
            alt=""
            className="pointer-events-none absolute inset-0 block h-full w-full object-cover"
          />

          <div className="pointer-events-none absolute bottom-0 left-0 h-[139px] w-[418px] bg-[radial-gradient(closest-side,#090909,rgba(9,9,9,0))]" />

          <div className="absolute left-[17px] top-[22px] z-[1]">
            <img
              src={assetUrl("assets/prime-batch-wordmark.svg")}
              alt={t("dossier.primeBatch")}
              className="block w-[256px] max-w-[min(60vw,256px)] max-[560px]:w-[210px]"
            />
          </div>

          <div className="absolute inset-x-5 bottom-5 z-[1] flex items-center max-[560px]:inset-x-3 max-[560px]:bottom-3.5">
            <GameVersionPlate version={version} />
          </div>

          <div className="pointer-events-none absolute inset-0 z-[2] rounded-[inherit] border border-white/20" />
        </section>
      </div>
    </section>
  );
}
