import { NailyWebMethod } from "../classes/method.class";
import { WATERMARK } from "../constants/watermark.constant";
import { IAdapterOptions } from "../typings";
import { NailyDependency } from "@naily/core";

export function createWebServer<Request = any, Response = any, NextFunction = any>(adapter: IAdapterOptions<Request, Response, NextFunction>) {
  const dependency = NailyDependency.getAll();
  for (const item of dependency.values()) {
    const controllerPath = Reflect.getMetadata(WATERMARK.CONTROLLER, item.target);
    if (!controllerPath) continue;
    const initer = new NailyWebMethod(controllerPath, adapter, item);
    const propertyMethodKeys = Reflect.ownKeys(item.target.prototype).filter((item) => item !== "constructor");
    propertyMethodKeys.forEach((jtem) => {
      initer.initGET(jtem);
    });
  }

  return {
    listen(port: number, callBack: () => any) {
      adapter.listen(port, callBack);
    },
    use(req: Request, res: Response, next: NextFunction) {
      adapter.middleware(req, res, next);
    },
  };
}
