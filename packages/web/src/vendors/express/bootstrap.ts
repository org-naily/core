import { NailyExpressWebApp } from "../../classes/express/express.class";
import { IAdapterOptions } from "../../typings";

export function createExpressWebServer<Request, Response, NextFunction>(
  adapter: IAdapterOptions<Request, Response, NextFunction>
): NailyExpressWebApp<Request, Response, NextFunction> {
  return new NailyExpressWebApp(adapter);
}

export function createCtxWebServer() {}
