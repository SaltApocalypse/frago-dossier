import embedCss from "../index.css?inline";

import "../i18n";
import { decodeCardData } from "../lib/embed";
import type { DossierData } from "../store/dossierStore";

const scriptUrl =
  (document.currentScript as HTMLScriptElement | null)?.src ??
  Array.from(document.querySelectorAll<HTMLScriptElement>("script[src]"))
    .reverse()
    .find((script) => script.src.includes("embed.js"))?.src;

const APP_ROOT = scriptUrl
  ? new URL("./", scriptUrl).href
  : `${window.location.origin}/`;
(globalThis as { __FRAGO_ASSET_BASE__?: string }).__FRAGO_ASSET_BASE__ =
  APP_ROOT;

function absolutizeCss(css: string) {
  return css.replace(
    /url\((['"]?)([^)'"]+)\1\)/g,
    (match, quote: string, url: string) => {
      if (/^(data:|https?:|\/\/|#)/.test(url)) return match;
      return `url(${quote}${new URL(url, APP_ROOT).href}${quote})`;
    }
  );
}

const shadowCss = `${absolutizeCss(embedCss)}
:host { display: block; width: 100%; }
.frago-embed { display: flex; justify-content: center; background: transparent; }
.frago-embed__card { width: 100%; max-width: 920px; }`;

void (async () => {
  const [{ createRoot }, { DossierCard }, { DEFAULT_DOSSIER }] =
    await Promise.all([
      import("react-dom/client"),
      import("../components/DossierCard"),
      import("../store/dossierStore"),
    ]);

  class FragoCardElement extends HTMLElement {
    static get observedAttributes() {
      return ["data"];
    }

    private root: ReturnType<typeof createRoot> | null = null;

    connectedCallback() {
      if (this.shadowRoot) {
        this.render();
        return;
      }

      const shadow = this.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.textContent = shadowCss;

      const wrapper = document.createElement("div");
      wrapper.className = "frago-embed";
      wrapper.setAttribute("data-theme", "frago");

      const card = document.createElement("div");
      card.className = "frago-embed__card";
      wrapper.appendChild(card);
      shadow.append(style, wrapper);

      this.root = createRoot(card);
      this.render();
    }

    attributeChangedCallback() {
      this.render();
    }

    private render() {
      if (!this.root) return;
      const payload = decodeCardData(this.getAttribute("data"));
      const data: DossierData = {
        ...DEFAULT_DOSSIER,
        ...payload,
      };
      this.root.render(<DossierCard data={data} />);
    }
  }

  if (!customElements.get("frago-card")) {
    customElements.define("frago-card", FragoCardElement);
  }
})();
