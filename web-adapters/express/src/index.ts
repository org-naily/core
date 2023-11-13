import { Injectable } from "@naily/core";
import { NExpAdapter } from "@naily/web";
import express, { NextFunction, Request, Response } from "express";

@Injectable()
export class ExpressAdapter<Req = Request, Res = Response, Next = NextFunction> implements NExpAdapter<Req, Res, Next> {
  private readonly app = express();

  handler(argument: NExpAdapter.NExpAdapterHandlerArgumentHost<Req, Res>) {
    const { getHandler, getPath, getHttpMethod } = argument;

    this.app[getHttpMethod()](getPath(), async (req, res, next) => {
      const handler = await getHandler({
        params: req.params,
        query: req.query,
        body: req.body,
        headers: req.headers,
        cookies: req.cookies,
        ip: req.ip,
        ips: req.ips,
        request: req,
        response: res,
        next: next,
      });
      if (!handler.haveError && !handler.isSended) return res.send(handler.value);
    });
  }

  middleware(handler: (req: Req, res: Res, next: Next) => void): void {
    this.app.use((req, res, next) => {
      handler(req as Req, res as Res, next as Next);
    });
  }

  listen(port: number, callBack: () => void) {
    this.app.listen(port, callBack);
  }
}

export { logger } from "./vendors/logger.service";
