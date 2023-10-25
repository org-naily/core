import { NailyFactoryConstant, Type } from "@naily/core";
import { INailyWeb } from "../typings/common.typing";
import { NailyWebFactoryRepository } from "../factories";

class Adapter<Request, Response, NextFunction extends Function> {
  constructor(private readonly webAdapter: INailyWeb.ExpAdapter<Request, Response, NextFunction>) {}

  useGlobalMiddleware(middleware: (req: Request, res: Response, next: NextFunction) => void): Adapter<Request, Response, NextFunction> {
    this.webAdapter.use(middleware);
    return this;
  }

  useGlobalPipe(pipe: Type<INailyWeb.WebPipe>) {
    const key: string = Reflect.getMetadata(NailyFactoryConstant.INJECTABLE, pipe);
    const transform = new NailyWebFactoryRepository().get(key).getInstance() as INailyWeb.WebPipe;

    this.useGlobalMiddleware((req, res, next) => {});

    return this;
  }

  listen(port: number, callback?: (port: number) => void) {
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
