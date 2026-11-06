import { createRootRoute, Outlet } from "@tanstack/react-router";

import { ThemeBackground } from "../theme/components";

// 根路由：静态 SPA 文档骨架由 index.html 提供，这里只放全局背景与页面容器
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <ThemeBackground />

      {/* 极淡的战术网格：仅装饰、不拦截交互 */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(92,191,205,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(92,191,205,0.045) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 78%)",
        }}
      />

      <Outlet />
    </>
  );
}
