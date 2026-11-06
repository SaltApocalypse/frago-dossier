import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

// 应用挂在子路径下部署（见 vite.config.ts 的 APP_BASEPATH）：
// 线上 https://lab.salta.top/frago-dossier/ = 应用内部 "/"
// 该 basepath 与 vite.config.ts 的 base 必须保持一致
export const APP_BASEPATH = "/frago-dossier";

export function getRouter() {
  return createRouter({
    routeTree,
    basepath: APP_BASEPATH,
    scrollRestoration: true,
  });
}
