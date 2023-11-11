import { NExpAdapter } from "@naily/web";
import express from "express";

export class ExpressAdapter implements NExpAdapter {
  private readonly app = express();

  handler(argument: NExpAdapter.NExpAdapterHandlerArgumentHost) {
    const { getHandler, getPath, getHttpMethod } = argument;

    this.app[getHttpMethod()](getPath(), async (req, res, next) => {
      const { value, haveError } = await getHandler({
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
      if (!haveError) res.send(value);
    });
  }

  listen(port: number, callBack: () => void) {
    this.app.listen(port, callBack);
  }
}
