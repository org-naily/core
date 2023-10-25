import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { INailyWeb } from "@naily/web";
import { Server } from "http";

export class ExpressAdapter implements INailyWeb.ExpAdapter<Request, Response, NextFunction> {
  private readonly app = express();

  use(middleware: <T>(req: Request, res: Response, next: NextFunction) => void | T): void {
    this.app.use(middleware);
  }
  listen(port: number, callback?: () => void): Server {
    return this.app.listen(port, callback);
  }
  handler(method: INailyWeb.HttpMethod, path: string, callback: <T>(options: INailyWeb.ExpAdapterHandler<Request, Response, NextFunction>) => T): void {
    this.app[method](path, async (req, res, next) => {
      const value = await callback({
        req: req,
        res: res,
        next: next,
        params: req.params,
        query: req.query,
        body: req.body,
        headers: req.headers,
        cookies: req.cookies,
        ip: req.ip,
      });
      res.send(value);
    });
  }
}
