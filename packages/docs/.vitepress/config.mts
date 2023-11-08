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
    i18nRouting: true,
    socialLinks: [{ icon: "github", link: "https://github.com/org-naily/core" }],
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "搜索",
                buttonAriaLabel: "搜索",
              },
              modal: {
                backButtonTitle: "返回",
                displayDetails: "显示详情",
                footer: {
                  closeKeyAriaLabel: "关闭",
                  closeText: "关闭",
                  navigateDownKeyAriaLabel: "向下导航",
                  navigateText: "导航",
                  navigateUpKeyAriaLabel: "向上导航",
                  selectKeyAriaLabel: "选择",
                  selectText: "选择",
                },
              },
            },
          },
        },
      },
    },
    footer: {
      message: "Made with ❤️ by Naily",
      copyright: `Zero © ${new Date().getFullYear()} Naily`,
    },
    sidebar: {
      "/zh/guide/": [
        {
          text: "上手",
          items: [
            {
              text: "开始",
              link: "/zh/guide/",
            },
            {
              text: "安装",
              link: "/zh/guide/install",
            },
            {
              text: "核心",
              link: "/zh/guide/concept/",
              collapsed: true,
              items: [
                {
                  text: "注入",
                  link: "/zh/guide/concept/inject",
                },
                {
                  text: "切面",
                  link: "/zh/guide/concept/aspect",
                },
                {
                  text: "组件",
                  link: "/zh/guide/concept/component",
                },
                {
                  text: "控制器",
                  link: "/zh/guide/concept/controller",
                },
              ],
            },
            {
              text: "Web",
              link: "/zh/guide/web/",
              collapsed: true,
              items: [
                {
                  text: "控制器",
                  link: "/zh/guide/web/controller",
                },
              ],
            },
          ],
        },
      ],
      "/en/": [],
    },
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
          { text: "上手", link: "/zh/guide/" },
        ],
        langMenuLabel: "切换语言",
        returnToTopLabel: "返回顶部",
        sidebarMenuLabel: "菜单",
        darkModeSwitchLabel: "夜间",
        lastUpdated: {
          text: "上次更新",
        },
        docFooter: {
          next: "下一篇",
          prev: "上一篇",
        },
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
        ],
        lastUpdated: {
          text: "Last Updated",
        },
      },
    },
  },
});
