import { NailyFactoryConstant, Type } from "@naily/core";
import { INailyWeb, INailyWebImpl } from "../typings";
import { NailyWebFactoryRepository } from "../factories";
import { NailyWebInitHook } from "../classes/init.class";
import { NailyWebParamConstant } from "../constants";

class Adapter<Request, Response, NextFunction extends Function> {
  constructor(private readonly webAdapter: INailyWeb.ExpAdapter<Request, Response, NextFunction>) {}

  useGlobalMiddleware(middleware: (req: Request, res: Response, next: NextFunction) => void): Adapter<Request, Response, NextFunction> {
    this.webAdapter.use(middleware);
    return this;
  }

  useGlobalPipe(pipe: Type<INailyWebImpl.WebPipe>) {
    const key: string = Reflect.getMetadata(NailyFactoryConstant.INJECTABLE, pipe);
    const getter = new NailyWebFactoryRepository().get(key);
    const transform = getter.getInstance() as INailyWebImpl.WebPipe;
    this.webAdapter.initPipe(async (args) => {
      const queryValue = await transform.transform(args.query, {
        getRequest: () => args.req,
        getResponse: () => args.res,
        dataProvider: "query",
      });
      if (queryValue) args.query = queryValue;
      const paramValue = await transform.transform(args.params, {
        getRequest: () => args.req,
        getResponse: () => args.res,
        dataProvider: "params",
      });
      if (paramValue) args.params = paramValue;
      const bodyValue = await transform.transform(args.body, {
        getRequest: () => args.req,
        getResponse: () => args.res,
        dataProvider: "body",
      });
      if (bodyValue) args.body = bodyValue;
      return args;
    });
    return this;
  }

  public async listen(port: number, callback?: (port: number) => void) {
    const repository = new NailyWebFactoryRepository();
    const ctx = repository.getContext();
    for (const item of ctx.all().values()) {
      const token: string = Reflect.getMetadata(NailyFactoryConstant.INJECTABLE, item.target);
      const ownKeys = repository.get(token).getTargetOwnKey();
      for (let i = 0; i < ownKeys.length; i++) {
        const functionalItem: Function = item.instance[ownKeys[i]];
        if (typeof functionalItem !== "function") continue;
        const value = await functionalItem.call(item.instance);
        this.webAdapter.handler(INailyWeb.HttpMethod.ALL, "/", (options) => {
          return value;
        });
      }
    }

    return this.webAdapter.listen(port, () => {
      if (callback) callback(port);
    });
  }
}

export function createNailyWebApplication<Request, Response, NextFunction extends Function>(
  webAdapter: INailyWeb.ExpAdapter<Request, Response, NextFunction>
): Adapter<Request, Response, NextFunction> {
  return new Adapter(webAdapter);
}
