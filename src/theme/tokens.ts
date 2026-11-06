/**
 * 项目内置主题的 token 导出（JS / SVG / Canvas 侧使用）
 *
 * 与 src/theme/index.css 中的 CSS 变量保持同源；改色时两边同步。
 */

export const colors = {
  /** 页面深底 */
  base100: "#0e1116",
  /** 卡面 */
  base200: "#162028",
  /** 边框 / 抬升面 */
  base300: "#27363a",
  content: "#b5b8bb",
  textDim: "#94989c",
  textFaint: "#5f6367",

  primary: "#5cbfcd",
  primaryBright: "#9ce8f2",
  primaryDim: "#3d8993",
  primaryDeep: "#2e6269",

  secondary: "#9ce8f2",
  accent: "#cd52ff",
  accentHover: "#dc85ff",
  success: "#00cdab",
  warning: "#f0a338",
  error: "#e5484d",
  neutral: "#434a51",

  btnBg: "#122c30",
  btnBorder: "#3d8993",
  btnFg: "#5cbfcd",
  btnHoverBg: "#163b42",
  btnHoverFg: "#9ce8f2",
  btnActiveBg: "#102629",
  btnActiveFg: "#40a5b3",
  btnDisabledBg: "#0f2427",
  btnDisabledBorder: "#1a3d41",
  btnDisabledFg: "#27575d",
} as const;

export const fonts = {
  primary: '"IBM Plex Sans", "CJK Punctuation ZH", system-ui, sans-serif',
  mono: '"IBM Plex Mono", "CJK Punctuation ZH", ui-monospace, monospace',
} as const;

export const radii = {
  box: "4px",
  field: "4px",
  selector: "4px",
  badge: "2px",
  avatar: "12px",
} as const;

export const themeId = "frago" as const;
