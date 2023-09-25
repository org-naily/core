import { ControllerAdapter, NailyControllerAdapter, NailyAdapterContext, NailyAdapterHost } from "@naily/core";
import * as express from "express";
import { Request, Response } from "express";

@ControllerAdapter
export class ExpressAdapter implements NailyControllerAdapter {
  private app = express();

  methodIntercept(host: NailyAdapterHost<Request, Response>, ctx: NailyAdapterContext): void | Promise<void> {
    this.app[host.method](host.path, async (req, res) => {
      const newRequest = host.request(req);
      res.send(host.response);
    });
  }

  listenerIntercept(port: number) {
    this.app.listen(port);
  }
}
