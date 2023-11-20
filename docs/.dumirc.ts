import { defineConfig } from "dumi";

export default defineConfig({
  themeConfig: {
    name: "Naily",
    showLineNum: true,
    logo: "assets/logo_black_fixed.png",
    socialLinks: {
      github: "https://github.com/org-naily/core",
    },
  },
  logo: "assets/logo_black_fixed.png",
  favicons: ["assets/logo_minmal.png"],
  locales: [
    {
      id: "zh-CN",
      name: "简体中文",
    },
    {
      id: "en-US",
      name: "English",
    },
  ],
});
