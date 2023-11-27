import { createUnplugin } from "unplugin";
import type {} from "vite";
import type {} from "webpack";

export const NailyUnPlugin = createUnplugin(() => {
  return {
    name: "naily-unplugin",
    transformInclude(id) {
      return id.endsWith(".ts");
    },
    async transform(code, id) {
      return code;
    },
  };
});

export const NailyVitePlugin = NailyUnPlugin.vite;
export const NailyRollupPlugin = NailyUnPlugin.rollup;
export const NailyWebpackPlugin = NailyUnPlugin.webpack;
export const NailyEsbuildPlugin = NailyUnPlugin.esbuild;
export const NailyRspackPlugin = NailyUnPlugin.rspack;
