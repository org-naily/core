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
                displayDetails: "显示详情",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                  closeText: "关闭",
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
      lang: "/en/",
      link: "/en/",
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
          {
            text: "Home",
            link: "/en/",
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
      lang: "/zh/",
      link: "/zh/",
      description: "轻量的企业级Web框架",
      themeConfig: {
        docFooter: {
          next: "下一页",
          prev: "上一页",
        },
        returnToTopLabel: "返回顶部",
        sidebarMenuLabel: "菜单",
        langMenuLabel: "切换语言",
        darkModeSwitchLabel: "切换夜间",
        nav: [
          {
            text: "主页",
            link: "/zh/",
          },
          {
            text: "上手",
            link: "/zh/guide/start",
          },
          {
            text: "参考",
            link: "/zh/reference/core/decorator/ioc/injectable",
          },
          {
            text: "哲学",
            link: "/zh/philosophy/talk",
          },
        ],
        sidebar: {
          "/zh/guide/": [
            {
              text: "快速开始",
              link: "/zh/guide/start",
            },
          ],
          "/zh/philosophy/": [
            {
              text: "探讨",
              link: "/zh/philosophy/talk",
            },
          ],
          "/zh/reference/": [
            {
              text: "核心",
              items: [
                {
                  text: "装饰器",
                  items: [
                    {
                      text: "IOC",
                      items: [
                        {
                          text: "@Injectable",
                          link: "/zh/reference/core/decorator/ioc/injectable",
                        },
                        {
                          text: "@Inject",
                          link: "/zh/reference/core/decorator/ioc/inject",
                        },
                        {
                          text: "@Autowired",
                          link: "/zh/reference/core/decorator/ioc/autowired",
                        },
                      ],
                    },
                    {
                      text: "AOP",
                      items: [
                        {
                          text: "@Aspect",
                          link: "/zh/reference/core/decorator/aop/aspect",
                        },
                        {
                          text: "@Before",
                          link: "/zh/reference/core/decorator/aop/before",
                        },
                        {
                          text: "@After",
                          link: "/zh/reference/core/decorator/aop/after",
                        },
                      ],
                    },
                    {
                      text: "@NailyApplication",
                      link: "/zh/reference/core/decorator/nailyApplication",
                    },
                  ],
                },
                {
                  text: "类型",
                  items: [
                    {
                      text: "IOC",
                      link: "/zh/reference/core/typings/ioc",
                    },
                  ],
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
  },
  base: "/core/",
});
