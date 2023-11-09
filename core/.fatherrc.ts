import { defineConfig } from "father";
import { join } from "path";

export default defineConfig({
  esm: { input: "src" },
  cjs: { input: "src" },
  umd: {},
  sourcemap: true,
  alias: {
    "@": join(__dirname, "./src"),
  },
});
