import express from "express";
import { IHttpMethod, NExpAdapter } from "@naily/web";

export class ExpressAdapter implements NExpAdapter {
  private readonly app = express();

  listen(port: number, callBack: (port: number) => void): void {
    this.app.listen(port, () => callBack(port));
  }

  handler(path: string, method: IHttpMethod, handler: (options: NExpAdapter.HandlerOptions) => Promise<NExpAdapter.HandlerReturn>): void {
    this.app[method](path, async (req, res, next) => {
      try {
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
      } catch (error) {
        return;
      }
    });
  }
}
