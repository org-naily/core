import { NailyWebFactory } from "@naily/backend";
import { Injectable, Value } from "@naily/core";
import express, { NextFunction, Request, Response } from "express";
import { NailyExpressAnalyser } from "./analyser.class";

@Injectable()
export class ExpressFactory extends NailyWebFactory {
  private readonly app = express();

  @Value("server.port")
  private readonly port: number;

  constructor() {
    super();
  }

  use(handler: (req: Request, res: Response, next: NextFunction) => any): this {
    this.app.use(handler);
    return this;
  }

  public listen(callBack?: (port: number) => void) {
    new NailyExpressAnalyser(ExpressFactory.mapper, this.app);
    return this.app.listen(this.port, () => (callBack ? callBack(this.port) : void 0));
  }
}
