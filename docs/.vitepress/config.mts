import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    server: {
      host: "0.0.0.0",
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],
    i18nRouting: true,
    socialLinks: [{ icon: "github", link: "https://github.com/org-naily/core" }],
  },
  locales: {
    root: {
      label: "简体中文",
      lang: "zh",
      link: "/zh/",
      title: "Naily",
      description: "一个 TypeScript Web 框架",
      themeConfig: {
        nav: [
          { text: "主页", link: "/zh/" },
          { text: "快速上手", link: "/zh/guide/" },
          { text: "API", link: "/zh/api/" },
        ],
      },
    },
    en: {
      label: "English",
      lang: "en",
      link: "/en/",
      title: "The Naily Project",
      description: "A TypeScript Web Framework",
      themeConfig: {
        nav: [
          { text: "Home", link: "/en/" },
          { text: "Guide", link: "/en/guide/" },
          { text: "API", link: "/en/api/" },
        ],
      },
    },
  },
});
