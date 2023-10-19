import { NailyApplication } from "@naily/core";

@NailyApplication({
  entry: "src/main.ts",
  scan: "src/**/*.ts",
  exclude: ["./src/ioc.ts", "./src/main.ts"],
})
export class BootStrap {}
