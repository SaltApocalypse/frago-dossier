import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { toPng } from "html-to-image";

import { DossierCard } from "../components/DossierCard";
import { EmbedDialog } from "../components/EmbedDialog";
import { SidePanel, type PanelTab } from "../components/SidePanel";
import { useDossierStore } from "../store/dossierStore";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const data = useDossierStore();
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelTab, setPanelTab] = useState<PanelTab>("profile");
  const [exporting, setExporting] = useState(false);
  const [embedOpen, setEmbedOpen] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  const handleExport = useCallback(async () => {
    if (!cardRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#0e1116",
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "frago-dossier.png";
      link.click();
    } catch (error) {
      console.error(error);
    } finally {
      setExporting(false);
    }
  }, []);

  return (
    <main className="flex min-h-dvh items-center justify-center p-4 sm:p-6">
      <DossierCard data={data} cardRef={cardRef} />

      <SidePanel
        data={data}
        onChange={data.setField}
        onReset={data.reset}
        onExport={handleExport}
        onEmbed={() => setEmbedOpen(true)}
        exporting={exporting}
        open={panelOpen}
        onOpenChange={setPanelOpen}
        activeTab={panelTab}
        onTabChange={setPanelTab}
      />

      {embedOpen && (
        <EmbedDialog data={data} onClose={() => setEmbedOpen(false)} />
      )}
    </main>
  );
}
