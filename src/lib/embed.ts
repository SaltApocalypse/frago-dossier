import type { DossierData } from "../store/dossierStore";

function toBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function absoluteUrl(value: string) {
  return value.startsWith("/") ? `${window.location.origin}${value}` : value;
}

function isSafeAvatar(value: string) {
  return /^(https?:\/\/|data:image\/|\/)/.test(value);
}

/** 将当前名片编码为嵌入 payload（base64url JSON） */
export function encodeCardData(data: DossierData) {
  const payload = {
    nickname: data.nickname,
    rank: data.rank,
    gameVersion: data.gameVersion,
    avatar: absoluteUrl(data.avatar),
  };
  return toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
}

/** 解码 <frago-card data="..."> 的内容；非法内容回退到默认值 */
export function decodeCardData(value: string | null): Partial<DossierData> {
  if (!value) return {};

  try {
    const parsed = JSON.parse(
      new TextDecoder().decode(fromBase64Url(value))
    ) as Record<string, unknown>;

    const result: Partial<DossierData> = {};
    if (typeof parsed.nickname === "string") {
      result.nickname = parsed.nickname.slice(0, 80);
    }
    if (typeof parsed.rank === "string") {
      result.rank = parsed.rank.slice(0, 40);
    }
    if (typeof parsed.gameVersion === "string") {
      result.gameVersion = parsed.gameVersion.slice(0, 40);
    }
    if (typeof parsed.avatar === "string" && isSafeAvatar(parsed.avatar)) {
      result.avatar = parsed.avatar;
    }
    return result;
  } catch {
    return {};
  }
}

/** embed.js 的线上地址（与当前应用同源） */
export function getEmbedScriptUrl() {
  return new URL(`${import.meta.env.BASE_URL}embed.js`, window.location.origin)
    .href;
}

/** 生成可直接粘贴到其他网站的 Web Component 代码 */
export function buildEmbedSnippet(data: DossierData) {
  const payload = encodeCardData(data);
  return [
    `<script src="${getEmbedScriptUrl()}" defer></script>`,
    `<frago-card data="${payload}"></frago-card>`,
  ].join("\n");
}
