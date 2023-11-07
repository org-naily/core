import express, { NextFunction, Request, Response } from "express";
import { IHttpMethod, NExpAdapter } from "@naily/web";
import { Server } from "http";

export class ExpressAdapter implements NExpAdapter<Request, Response, NextFunction> {
  private readonly app = express();

  listen<T extends any = Server>(port: number, callBack: (port: number) => void): T {
    return this.app.listen(port, () => callBack(port)) as T;
  }

  useMiddleware(handler: (req: Request, res: Response, next: NextFunction) => void): void {
    this.app.use(handler);
  }

  handler(path: string, method: IHttpMethod, handler: (options: NExpAdapter.HandlerOptions) => Promise<NExpAdapter.HandlerReturn>): void {
    this.app[method](path, async (req, res, next) => {
      const { body, haveError } = await handler({
        query: req.query,
        body: req.body,
        params: req.params,
        headers: req.headers,
        ip: req.ip,
        ips: req.ips,
        cookies: req.cookies,
        req,
        res,
        next,
      });
      if (!haveError) return res.send(body);
    });
  }
}
