import { NExpAdapter, WebArgumentHost, WebExpExtractor, WebExpPipeExtractor, WebExpPipeExtractorReturner } from "@naily/web";
import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { Server } from "http";

export class ExpressAdapter implements NExpAdapter<Request, Response, NextFunction> {
  private readonly app = express();

  handler(argumentHost: WebArgumentHost, extractor: (options: WebExpExtractor) => any): void {
    const method = argumentHost.getMethod();
    const path = argumentHost.getPath();
    const haveResponse = argumentHost.getHaveResponse();

    this.app[method](path, async (req, res, next) => {
      const data = await extractor({
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

      if (!haveResponse) return res.send(data);
    });
  }

  listen(port: number, callback?: (port: number) => any): Server {
    return this.app.listen(port, () => (callback ? callback(port) : void 0));
  }

  use(callback: (req: Request, res: Response, next: NextFunction) => any) {
    this.app.use(callback);
  }

  pipeChanged(extractor: (options: WebExpPipeExtractor) => WebExpPipeExtractorReturner | Promise<WebExpPipeExtractorReturner>): void {
    this.app.use(async (req, res, next) => {
      const result = await extractor({
        req: req,
        res: res,
        params: req.params,
        query: req.query,
        body: req.body,
      });
      req.params = result.params;
      req.query = result.query;
      req.body = result.body;
      next();
    });
  }
}
