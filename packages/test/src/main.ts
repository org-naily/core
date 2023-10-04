import { NailyApplication } from "@naily/core";
import "@naily/build";

@NailyApplication({
  scan: "src/**/*.ts",
  exclude: ["src/main.ts", "src/main.spec.ts"],
})
class BootStrap {}
