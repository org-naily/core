import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Naily",
  description: "A light Web enterprise framework for node.js",
  themeConfig: {
    socialLinks: [{ icon: "github", link: "https://github.com/org-naily" }],
    search: {
      provider: "local",
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                },
              },
            },
          },
        },
      },
    },
  },
  locales: {
    root: {
      label: "English",
      lang: "en",
      link: "/en/",
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
          {
            text: "Home",
            link: "/en/index",
          },
          {
            text: "Guide",
            link: "/en/guide/start",
          },
          {
            text: "Reference",
            link: "/en/reference/core/decorator",
          },
        ],
        sidebar: {
          "/en/guide/": [
            {
              text: "Getting Start",
              link: "/en/guide/start",
            },
          ],
          "/en/reference/": [
            {
              text: "Core",
              items: [
                {
                  text: "Decorator",
                  link: "/en/reference/core/decorator",
                },
              ],
            },
          ],
        },
      },
    },
    zh: {
      label: "简体中文",
      lang: "zh",
      link: "/zh/",
      themeConfig: {
        nav: [
          {
            text: "主页",
            link: "/zh/index",
          },
          {
            text: "上手",
            link: "/zh/guide/start",
          },
          {
            text: "参考",
            link: "/zh/reference/core/decorator",
          },
        ],
        sidebar: {
          "/zh/guide/": [
            {
              text: "快速开始",
              link: "/zh/guide/start",
            },
          ],
          "/zh/reference/": [
            {
              text: "Core",
              items: [
                {
                  text: "装饰器",
                  link: "/zh/reference/core/decorator",
                },
              ],
            },
          ],
        },
      },
    },
  },
  vite: {
    server: {
      host: "0.0.0.0",
    },
    base: "./core",
  },
});
