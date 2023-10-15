import { IAdapterOptions } from "../typings";
import { NailyDependency } from "@naily/core";

export function createWebServer<Request = any, Response = any, NextFunction = any>(adapter: IAdapterOptions<Request, Response, NextFunction>) {
  const dependency = NailyDependency.getAll();
  dependency.forEach((item) => {
    console.log(item);
  });

  return {
    listen(port: number, callBack: () => any) {
      adapter.listen(port, callBack);
    },
    use(req: Request, res: Response, next: NextFunction) {
      adapter.middleware(req, res, next);
    },
  };
}
