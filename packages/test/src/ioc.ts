import { NailyApplication } from "@naily/core";
import { join } from "path";

@NailyApplication({
  entry: join(process.cwd(), "./src/main.ts"),
  scan: join(process.cwd(), "./src/**/*.ts"),
  rootDir: "./src",
  iocDir: "./src/ioc.ts",
})
export class BootStrap {}
