import { NailyApplication } from "@naily/core";

@NailyApplication({
  entry: "./src/main.ts",
  scan: "./src/**/*.ts",
  exclude: [__filename, "./src/*.ts"],
})
export class BootStrap {}
