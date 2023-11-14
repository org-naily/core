import { defineConfig } from "father";
import { join } from "path";

export default defineConfig({
  esm: {},
  cjs: {},
  umd: {
    platform: "browser",
  },
  sourcemap: true,
  alias: {
    "@": join(process.cwd(), "./src"),
  },
});
