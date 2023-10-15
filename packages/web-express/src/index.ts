import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { createAdapter } from "@naily/web";

const app = express();

export const ExpressAdapter = createAdapter<Request, Response, NextFunction>(() => ({
  listen(port, afterListen) {
    app.listen(port, afterListen);
  },
  middleware(...args: any[]) {
    app.use(...args);
  },
  handler(path, method, handler) {
    app[method](path, async (req, res, next) => {
      const value = await handler(req, res, next, {
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
        headers: req.headers,
        ip: req.ip,
        ips: req.ips,
      });
      res.send(value);
    });
  },
}));
