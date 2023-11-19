import { NailyWebFactory } from "@naily/backend";
import { Injectable, Value } from "@naily/core";
import express from "express";

@Injectable()
export class ExpressFactory extends NailyWebFactory {
  private readonly app = express();

  @Value("server.port")
  private readonly port: number;

  constructor() {
    super();
  }

  public getApp() {
    return this.app;
  }

  public listen(callBack?: (port: number) => void) {
    this.app.listen(this.port, () => (callBack ? callBack(this.port) : void 0));
  }
}
