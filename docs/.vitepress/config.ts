import path from "path";
import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "GRender",
  description: "A lightweight canvas library for 2D.",
  base: "/grender/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.svg",
    lastUpdated: true,
    nav: [
      {
        text: "指南",
        link: "/guide",
      },
      {
        text: "API",
        link: "/api",
      },
      {
        text: "图形",
        link: "/shape",
      },
    ],
    search: { provider: "local" },
    editLink: {
      pattern: "https://github.com/nashaofu/grender/edit/master/docs/:path",
    },
  },
  vite: {
    resolve: {
      alias: {
        grender: path.join(__dirname, "../.."),
      },
    },
  },
});
