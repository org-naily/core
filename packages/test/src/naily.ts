import { NailyScanFactory } from "@naily/scan";

NailyScanFactory.scanFileSync({
  entry: "src/main.ts",
  scan: "src/**/*.ts",
  rootDir: "src",
  exclude: ["src/main.ts", "src/naily.ts"],
});
