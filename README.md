# frago-dossier

Frago / Fragmentary Order 风格名片生成器 —— **FRAGO // DOSSIER GENERATOR**。

## 技术栈

- Vite 8 + React 19 + TypeScript
- TanStack Router（单路由）
- Tailwind CSS v4 + daisyUI 5
- 内置设计系统 `src/theme`（daisyUI token + 组件，原独立主题包已内联）
- Web Component 嵌入（`<frago-card>` + `embed.js`，Shadow DOM 隔离）
- i18next / react-i18next（中 / 英）
- Zustand（选项状态 + localStorage 持久化）
- IBM Plex Sans / Mono（`@fontsource`，仅 Latin 子集）

## 页面结构

- 单路由 `/`，名片整体居中
- 名片右上角白色透明水印：`CREATED BY FRAGO DOSSIER · UNOFFICIAL FAN-MADE`
- 资料区右侧显示当前军衔状态牌（默认 Tier V / FOUNDATION；在资料页切换军衔时同步）
- 左上角图标栏 + 滑出式选项浮层（视觉与交互均由项目内 `src/theme` 的 `Sidebar` / `Toggle` / `Segmented` / `Dropdown` / `Field` 组件提供）：
  - **资料**：昵称、头像（默认头像）、军衔（Tier I–V 五档，默认 Tier V）、游戏版本（FOUNDERS / CANDIDATES，默认 FOUNDERS）、底部「导出 PNG / 嵌入代码 / 重置」按钮
  - **设置**：语言（中 / 英）
  - **关于**：项目简介、免责声明与 GitHub Issues 联络入口
- 交互：hover 图标栏滑出面板；点击图标固定；关闭按钮收起；移动端点击打开
- 军衔牌无积分/箭头，牌面 190px，右侧留白 20px，渐变随徽章主色
- 游戏版本切换：
  - **FOUNDERS**：卡面背景与版本牌徽章使用 hub 的 Prime Batch 素材
  - **CANDIDATES**：背景暂用占位图，版本牌图标已接入（`public/assets/candidates-badge.png`）
- 游戏版本牌：无激活字样、无箭头，牌面 190px，位于 Prime Batch 卡底部原徽章位置
- Prime Batch 卡底部不再显示 `PRIME BATCH` 文本
- 导出：资料页底部「导出 PNG」，默认输出 2× PNG（`frago-dossier.png`）
- 所有改动自动保存到 `localStorage`（`frago-dossier:v1`）

## 开发

```bash
pnpm install
pnpm generate   # 生成 src/routeTree.gen.ts
pnpm dev        # http://localhost:3100/frago-dossier/
```

`src/routeTree.gen.ts` 由插件生成且被 `.gitignore` 忽略；全新克隆后必须先 `pnpm generate`（或 `pnpm dev`）。

## 构建

```bash
pnpm build
# = pnpm generate && tsc --noEmit && pnpm build:embed && cp dist-embed/embed.js public/embed.js && vite build
```

构建产物资源前缀为 `/frago-dossier/`（见 `vite.config.ts` 的 `APP_BASEPATH`，需与 `src/router.tsx` 的 `basepath` 一致）。

## 嵌入（Web Component）

`pnpm build` 会先生成 `embed.js`（`public/embed.js` → `dist/embed.js`），与主应用一起部署。

宿主网站：

```html
<script src="https://lab.salta.top/frago-dossier/embed.js" defer></script>
<frago-card data="..."></frago-card>
```

- 资料页点击「嵌入代码」生成当前名片代码并复制
- 使用 Shadow DOM 隔离宿主样式
- CSS 与字体全部内联进 `embed.js`；头像/军衔/版本素材从脚本所在应用加载
- 头像需要使用公开可访问的 URL
- 本地调试：先运行 `pnpm build:embed`（或 `pnpm build`），`pnpm dev` 才会提供 `public/embed.js`

## 内置设计系统

原独立主题包的内容已内联到 `src/theme/`，项目不再依赖外部主题仓库：

- `src/theme/index.css`：daisyUI `frago` 暗色主题、扩展 color/动画 token、`bg-frago-vignette`
- `src/theme/components/`：`Button` / `LightButton` / `Panel` / `Input` / `Textarea` / `Badge` / `Avatar` / `Tooltip` / `Dropdown` / `Segmented` / `Sidebar` / `Field` / `Toggle` / `ThemeBackground`
- `src/theme/tokens.ts` / `theme.ts`：JS token 与主题组件集合

入口 CSS：

```css
@import "tailwindcss";
@import "./theme/index.css";
@plugin "daisyui" {
  themes: false;
  logs: false;
}
```

Tailwind 默认扫描 `src/`，已覆盖 `src/theme/components`，不需要额外 `@source`。

## 挂载到 lab.salta.top

与 `infinite-title-generator` 相同：

1. `pnpm build`；
2. 将 `dist/*` 复制到 `SaltLab-Lab/public/frago-dossier/`；
3. 推送 `SaltLab-Lab` 的 `main` → GitHub Actions → `https://lab.salta.top/frago-dossier/`。

主题在构建时已打包进静态资源，Lab 仓库不需要安装主题依赖。

设计系统已内联到 `src/theme/`，本项目可作为独立项目单独运行与部署。

## 素材与版权

- 字体：IBM Plex（SIL OFL，开源），通过 `@fontsource` 打包。
- Cor3 窗体图标（个人博客 SaltLab 使用，`public/cor3.svg`）来自 <https://cor3.gg>，版权归对应权利人所有。
- 本项目与 Cor3 / Fragmentary Order 官方无任何关联，亦未获得其认可或赞助。游戏及相关商标、素材与知识产权均归原权利人所有（Fragment Order / Rant Studio）。
