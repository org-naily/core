import { defineConfig } from "father";

export default defineConfig({
  esm: {},
  cjs: {},
  umd: {},
  sourcemap: true,
  prebundle: {
    deps: {},
  },
});