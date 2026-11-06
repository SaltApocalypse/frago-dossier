import {
  Code2,
  Download,
  ExternalLink,
  Info,
  RotateCcw,
  Settings,
  Upload,
  User,
} from "lucide-react";
import { useRef, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import {
  Button,
  Dropdown,
  FieldRow,
  Input,
  LightButton,
  Segmented,
  Sidebar,
  type DropdownOption,
  type SidebarTab,
} from "../theme/components";

import { RANKS, rankLabel } from "../data/ranks";
import { GAME_VERSIONS } from "../data/gameVersions";
import { changeLanguage, LANGUAGES, type Lang } from "../i18n";
import { fileToDataUrl } from "../lib/image";
import {
  DEFAULT_DOSSIER,
  type DossierData,
} from "../store/dossierStore";

export type PanelTab = "profile" | "settings" | "about";

export interface SidePanelProps {
  data: DossierData;
  onChange: <K extends keyof DossierData>(
    key: K,
    value: DossierData[K]
  ) => void;
  onReset: () => void;
  onExport: () => void;
  onEmbed: () => void;
  exporting: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeTab: PanelTab;
  onTabChange: (tab: PanelTab) => void;
}

const iconClass = "h-[18px] w-[18px]";

/** 上传 / 重置 用的小图标按钮 */
const iconButtonClass = "h-8 w-8 justify-center px-0! py-0!";

/** 军衔下拉选项：图标 + 文字颜色均取自军衔徽章 */
const rankOptions: DropdownOption[] = RANKS.map((rank) => ({
  value: rank.id,
  label: rankLabel(rank),
  icon: <img src={rank.icon} alt="" className="h-4 w-4" />,
  color: rank.textColor ?? rank.color,
}));

/** 游戏版本下拉选项 */
const gameVersionOptions: DropdownOption[] = GAME_VERSIONS.map((version) => ({
  value: version.id,
  label: version.name,
}));

/**
 * SidePanel —— 名片选项
 *
 * 合并为两个分组：
 *  - 资料：昵称、头像、军衔、游戏版本
 *  - 显示：语言、重置全部
 *
 * 侧边栏视觉与交互由项目内 src/theme 提供。
 */
export function SidePanel({
  data,
  onChange,
  onReset,
  onExport,
  onEmbed,
  exporting,
  open,
  onOpenChange,
  activeTab,
  onTabChange,
}: SidePanelProps) {
  const { t, i18n } = useTranslation();
  const avatarInput = useRef<HTMLInputElement>(null);

  const lang: Lang = i18n.language.toLowerCase().startsWith("zh") ? "zh" : "en";

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await fileToDataUrl(file, 512);
      onChange("avatar", dataUrl);
    } catch (error) {
      console.error(error);
    } finally {
      event.target.value = "";
    }
  }

  const tabs: SidebarTab[] = [
    {
      id: "profile",
      label: t("panel.profile"),
      icon: <User className={iconClass} />,
      content: (
        <div>
          <FieldRow label={t("panel.nickname")}>
            <div className="w-40">
              <Input
                value={data.nickname}
                onChange={(event) => onChange("nickname", event.target.value)}
                placeholder={t("panel.nicknamePlaceholder")}
                maxLength={40}
              />
            </div>
          </FieldRow>

          <FieldRow label={t("panel.avatar")}>
            <img
              src={data.avatar}
              alt=""
              className="h-8 w-8 rounded-[2px] border border-white/10 object-cover"
            />
            <LightButton
              aria-label={t("panel.upload")}
              title={t("panel.upload")}
              onClick={() => avatarInput.current?.click()}
              className={iconButtonClass}
            >
              <Upload className="h-3.5 w-3.5" />
            </LightButton>
            <LightButton
              aria-label={t("panel.reset")}
              title={t("panel.reset")}
              onClick={() => onChange("avatar", DEFAULT_DOSSIER.avatar)}
              className={iconButtonClass}
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </LightButton>
            <input
              ref={avatarInput}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
          </FieldRow>

          <FieldRow label={t("panel.rank")}>
            <Dropdown
              options={rankOptions}
              value={data.rank}
              onChange={(value) => onChange("rank", value)}
              placeholder=""
              ariaLabel={t("panel.rank")}
              className="w-60"
            />
          </FieldRow>

          <div className="my-2 h-px bg-white/10" />

          <FieldRow label={t("panel.gameVersion")}>
            <Dropdown
              options={gameVersionOptions}
              value={data.gameVersion}
              onChange={(value) => onChange("gameVersion", value)}
              placeholder=""
              ariaLabel={t("panel.gameVersion")}
              className="w-40"
            />
          </FieldRow>

          <div className="my-2 h-px bg-white/10" />

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={onExport}
              disabled={exporting}
              className="flex-1 justify-center gap-1.5 whitespace-nowrap"
            >
              <Download className="h-3.5 w-3.5" />
              {exporting ? t("panel.exporting") : t("panel.exportPng")}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onReset}
              className="flex-1 justify-center gap-1.5 whitespace-nowrap border border-white/10"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {t("panel.resetAll")}
            </Button>
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={onEmbed}
            className="mt-2 w-full justify-center gap-1.5 border border-white/10"
          >
            <Code2 className="h-3.5 w-3.5" />
            {t("panel.embedCode")}
          </Button>
        </div>
      ),
    },
    {
      id: "settings",
      label: t("panel.settings"),
      icon: <Settings className={iconClass} />,
      content: (
        <div>
          <FieldRow label={t("panel.language")}>
            <Segmented
              options={LANGUAGES}
              value={lang}
              onChange={(value) => changeLanguage(value as Lang)}
            />
          </FieldRow>
        </div>
      ),
    },
    {
      id: "about",
      label: t("panel.about"),
      icon: <Info className={iconClass} />,
      content: (
        <div>
          <p className="text-sm leading-relaxed">{t("panel.aboutIntro")}</p>
          <p className="mt-2 text-sm leading-relaxed text-base-content/80">
            {t("panel.aboutDisclaimer")}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-base-content/60">
            {t("panel.rightsNotice")}
          </p>
          <a
            href="https://github.com/SaltApocalypse/frago-dossier/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-xs text-primary underline-offset-2 transition-colors hover:text-primary-bright hover:underline"
          >
            GitHub Issues
            <ExternalLink className="h-3 w-3" />
          </a>

          {/* 相关链接：官网与官方 Discord */}
          <div className="mt-4 border-t border-white/10 pt-3">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-base-content/50">
              {t("panel.links")}
            </p>
            <ul className="space-y-1.5">
              {[
                {
                  label: t("panel.linkFragmentOrder"),
                  href: "https://fragmentaryorder.com/",
                },
                {
                  label: t("panel.linkCor3"),
                  href: "https://cor3.gg/",
                },
                {
                  label: t("panel.linkDiscord"),
                  href: "https://discord.gg/frago",
                },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 rounded-[3px] border border-white/10 bg-white/[0.02] px-2.5 py-1.5 text-xs text-base-content/80 transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="h-3 w-3 shrink-0 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Sidebar
      tabs={tabs}
      activeId={activeTab}
      onActiveChange={(id) => onTabChange(id as PanelTab)}
      open={open}
      onOpenChange={onOpenChange}
      closeLabel={t("panel.close")}
    />
  );
}
