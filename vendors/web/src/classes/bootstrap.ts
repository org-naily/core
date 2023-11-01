import { NContainer, NPlugin } from "@naily/core";
import { NExpAdapter } from "../typings";

class NailyExpWebCorePlugin<Request, Response, NextFunction> implements NPlugin {
  constructor(private readonly adapter: NExpAdapter<Response, Request, NextFunction>, private readonly port: number, private readonly callBack?: (port: number) => any) {}

  install(container: NContainer): void {
    this.adapter.listen(this.port, this.callBack);
  }
}

export class NailyExpWebPlugin<Request, Response, NextFunction> {
  constructor(private readonly adapter: NExpAdapter<Response, Request, NextFunction>) {}

  use(handler: (req: Request, res: Response, next: NextFunction) => any): this {
    this.adapter.use((req, res, next) => {
      return handler(req as unknown as Request, res as unknown as Response, next);
    });
    return this;
  }

  listen(port: number, callback?: (port: number) => any) {
    return new NailyExpWebCorePlugin(this.adapter, port, callback);
  }
}
