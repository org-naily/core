import { Logger } from "@naily/core";
import { NailyWeb } from "../classes/method.class";
import { IAdapterOptions } from "../typings";

export function createWebServer<Request = any, Response = any, NextFunction = any>(adapter: IAdapterOptions<Request, Response, NextFunction>) {
  const app = {
    listen(port: number, callBack: () => any) {
      new NailyWeb(adapter);
      return adapter.listen(port, callBack);
    },
    use<T = any>(middleware: (...args: any[]) => T) {
      adapter.middleware(middleware);
      new Logger().info(`Middleware ${middleware.name} is loaded`);
      return app;
    },
  };

  return app;
}
