import { NailyApplication } from "@naily/core";

@NailyApplication({
  entry: "./src/main.ts",
  scan: "./src/**/*.ts",
})
export class BootStrap {}
