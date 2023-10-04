import { NailyApplication } from "@naily/core";

@NailyApplication({
  scan: "src/**/*.ts",
  exclude: ["src/main.ts", "src/main.spec.ts"],
})
export class BootStrap {}
