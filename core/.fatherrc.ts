import { defineConfig } from "father";

export default defineConfig({
  esm: {
    transformer: "esbuild",
  },
  cjs: {
    transformer: "esbuild",
  },
  prebundle: {
    deps: {},
  },
  sourcemap: true,
});
