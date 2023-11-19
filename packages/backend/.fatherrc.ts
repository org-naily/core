import { defineConfig } from "father";

export default defineConfig({
  esm: {},
  cjs: {},
  sourcemap: true,
  alias: {
    "@": "src",
  },
});
