import { Check, Copy, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { buildEmbedSnippet } from "../lib/embed";
import type { DossierData } from "../store/dossierStore";
import { Button, Panel, Textarea } from "../theme/components";

export interface EmbedDialogProps {
  data: DossierData;
  onClose: () => void;
}

/** 生成 Web Component 嵌入代码，供宿主网站粘贴使用 */
export function EmbedDialog({ data, onClose }: EmbedDialogProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const code = buildEmbedSnippet(data);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("embed.title")}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <Panel padding="md" className="w-full max-w-lg">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
            {t("embed.title")}
          </h2>
          <button
            type="button"
            aria-label={t("embed.close")}
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center text-[var(--color-text-dim)] transition-colors hover:text-base-content"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mb-3 text-xs leading-relaxed text-base-content/70">
          {t("embed.description")}
        </p>

        <Textarea
          readOnly
          rows={7}
          value={code}
          className="font-mono! text-[11px]! leading-5"
        />

        <div className="mt-3 flex justify-end">
          <Button size="sm" onClick={copy} className="gap-1.5">
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {copied ? t("embed.copied") : t("embed.copy")}
          </Button>
        </div>
      </Panel>
    </div>
  );
}
