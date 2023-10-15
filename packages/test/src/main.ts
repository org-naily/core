import { NailyApplication } from "@naily/core";
import { createWebServer } from "@naily/web";
import { ExpressAdapter } from "@naily/web-express";

@NailyApplication({ entry: "./src/main.ts", scan: "./src/**/*.ts" })
export class BootStrap {}

createWebServer(ExpressAdapter);
