import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/**
 * Web Component 嵌入构建：输出单文件 embed.js
 *
 * - 使用 shadow DOM 隔离宿主样式
 * - CSS（含字体）内联进 JS，避免宿主站点跨域拉取字体
 * - 资源 URL 由运行时 __FRAGO_ASSET_BASE__ 指向脚本所在应用根路径
 */
export default defineConfig({
  base: "./",
  publicDir: false,
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist-embed",
    emptyOutDir: true,
    assetsInlineLimit: 1024 * 1024,
    lib: {
      entry: fileURLToPath(new URL("./src/embed/index.tsx", import.meta.url)),
      name: "FragoEmbed",
      formats: ["iife"],
      fileName: () => "embed.js",
    },
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
});
