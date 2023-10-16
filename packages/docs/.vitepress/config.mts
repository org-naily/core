import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Naily",
  description: "A light Web enterprise framework for node.js",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "Guide",
        link: "/docs/guide/start",
      },
      {
        text: "Reference",
        link: "/docs/reference/core/decorator",
      },
    ],

    sidebar: {
      "/docs/guide/": [
        {
          text: "Getting Start",
          link: "/docs/guide/start",
        },
      ],
      "/docs/reference/": [
        {
          text: "Core",
          items: [
            {
              text: "Decorator",
              link: "/docs/reference/core/decorator",
            },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/org-naily/core" }],
  },
});
