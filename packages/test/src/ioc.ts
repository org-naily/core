import { NailyApplication } from "@naily/core";

@NailyApplication({
  entry: "./src/main.ts",
  scan: "./src/**/*.ts",
  rootDir: "src",
  exclude: [__filename, "./src/main.ts", "./src/ioc.ts"],
})
export class BootStrap {}
