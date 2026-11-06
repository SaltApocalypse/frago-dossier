const DEFAULT_BASE = import.meta.env.BASE_URL;

type AssetGlobal = typeof globalThis & {
  __FRAGO_ASSET_BASE__?: string;
};

/**
 * 资源 URL：
 * - 主应用：使用 Vite BASE_URL（/frago-dossier/）
 * - embed.js：入口会先设置 __FRAGO_ASSET_BASE__ 为脚本所在应用的绝对根路径
 *   （例如 https://lab.salta.top/frago-dossier/），避免在宿主站点解析到错误域名。
 */
export function assetUrl(path: string) {
  const base = (globalThis as AssetGlobal).__FRAGO_ASSET_BASE__ ?? DEFAULT_BASE;
  return `${base}${path}`;
}
