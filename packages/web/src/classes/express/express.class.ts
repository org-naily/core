import { Logger } from "@naily/core";
import { NailyWeb } from "./method.class";
import { IAdapterOptions } from "../../typings";

export class NailyExpressWebApp<Request = any, Response = any, NextFunction = any> {
  constructor(private readonly adapter: IAdapterOptions<Request, Response, NextFunction>) {}

  listen(port: number, callBack?: () => any) {
    new NailyWeb(this.adapter);
    return this.adapter.listen(port, callBack);
  }

  use<T = any>(middleware: (req: Request, res: Response, next: NextFunction) => T) {
    this.adapter.middleware(middleware);
    new Logger().info(`Middleware ${middleware.name} is loaded`);
    return this;
  }
}
