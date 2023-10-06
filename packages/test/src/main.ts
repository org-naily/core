import { NailyApplication } from "@naily/core";
import "@naily/web";
import "@naily/build";

@NailyApplication({
  scan: "src/**/*.ts",
  exclude: ["src/main.ts", "src/main.spec.ts"],
})
export class BootStrap {}
