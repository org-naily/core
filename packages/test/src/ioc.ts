import { NailyApplication } from "@naily/core";
import { join } from "path";

@NailyApplication({
  entry: join(process.cwd(), "./src/main.ts"),
  scan: join(process.cwd(), "./src/**/*.ts"),
  filename: __filename,
})
export class BootStrap {}
