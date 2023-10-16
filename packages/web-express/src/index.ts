import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { createAdapter } from "@naily/web";
import { HttpMethod } from "@naily/web/dist/constants/method.constant";

const app = express();
type ExpressHttpMethod = "get" | "post" | "put" | "delete" | "patch" | "options" | "head" | "all" | "trace";

export const ExpressAdapter = createAdapter<Request, Response, NextFunction>(() => ({
  listen(port, afterListen) {
    app.listen(port, afterListen);
  },
  middleware(middleware): any {
    return app.use(middleware);
  },
  handler(path, method, handler) {
    let expressMethods: ExpressHttpMethod;
    if (method === HttpMethod.GET) {
      expressMethods = "get";
    } else if (method === HttpMethod.POST) {
      expressMethods = "post";
    } else if (method === HttpMethod.PUT) {
      expressMethods = "put";
    } else if (method === HttpMethod.DELETE) {
      expressMethods = "delete";
    } else if (method === HttpMethod.PATCH) {
      expressMethods = "patch";
    } else if (method === HttpMethod.OPTIONS) {
      expressMethods = "options";
    } else if (method === HttpMethod.HEAD) {
      expressMethods = "head";
    } else if (method === HttpMethod.ALL) {
      expressMethods = "all";
    } else if (method === HttpMethod.TRACE) {
      expressMethods = "trace";
    } else {
      throw new Error("Unsupported HTTP method.");
    }

    app[expressMethods](path, async (req, res, next) => {
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
