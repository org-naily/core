import { NPipe, NUpperCaseHttpMethod, NailyWebFactory, convertUppercase } from "@org-naily/backend";
import { Injectable, NailyFactory, Type } from "@org-naily/core";
import express, { NextFunction, Request, Response } from "express";
import { NailyExpressAnalyser } from "./analyser.class";

@Injectable()
export class ExpressFactory extends NailyWebFactory {
  private readonly app = express();

  use(handler: (req: Request, res: Response, next: NextFunction) => any): this {
    this.app.use(handler);
    return this;
  }

  useGlobalPipe(pipe: Type<NPipe>): this {
    this.app.use((req, res, next) => {
      const instance = new NailyFactory(pipe).getInstance();
      instance.transform(req.params, {
        getName: () => undefined,
        getRequest: <Request>() => req as Request,
        getResponse: <Response>() => res as Response,
        getContext: () => undefined,
        getDecoratorType: () => "params",
        getHttpMethod: () => convertUppercase(req.method as NUpperCaseHttpMethod),
      });
      instance.transform(req.query, {
        getName: () => undefined,
        getRequest: <Request>() => req as Request,
        getResponse: <Response>() => res as Response,
        getContext: () => undefined,
        getDecoratorType: () => "query",
        getHttpMethod: () => convertUppercase(req.method as NUpperCaseHttpMethod),
      });
      instance.transform(req.body, {
        getName: () => undefined,
        getRequest: <Request>() => req as Request,
        getResponse: <Response>() => res as Response,
        getContext: () => undefined,
        getDecoratorType: () => "body",
        getHttpMethod: () => convertUppercase(req.method as NUpperCaseHttpMethod),
      });
      next();
    });
    return this;
  }

  public listen(callBack?: (port: number) => void) {
    new NailyExpressAnalyser(ExpressFactory.mapper, this.app);
    return this.app.listen(this.port, () => (callBack ? callBack(this.port) : void 0));
  }
}
