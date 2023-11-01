import { NExpAdapter, WebArgumentHost, WebExpExtractor } from "@naily/web";
import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { Server } from "http";

export class ExpressAdapter implements NExpAdapter<Request, Response, NextFunction> {
  private readonly app = express();

  handler(argumentHost: WebArgumentHost, extractor: (options: WebExpExtractor) => any): void {
    const method = argumentHost.getMethod();
    const path = argumentHost.getPath();

    this.app[method](path, async (req, res, next) => {
      return await extractor({
        req: req,
        res: res,
        next: next,
        params: req.params,
        query: req.query,
        body: req.body,
        cookies: req.cookies,
        headers: req.headers,
        ip: req.ip,
        ips: req.ips,
      });
    });
  }

  listen(port: number, callback?: (port: number) => any): Server {
    return this.app.listen(port, () => (callback ? callback(port) : void 0));
  }

  use(callback: (req: Request, res: Response, next: NextFunction) => any) {
    this.app.use(callback);
  }
}
