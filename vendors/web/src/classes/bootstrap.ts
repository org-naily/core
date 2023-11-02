import { NContainer, NPlugin, NailyClassFactory, NailyFactory, Type } from "@naily/core";
import { NExpAdapter, NPipe } from "../typings";
import { NailyWebWatermark } from "../constants/warermark.constant";
import { NailyExpWebCore } from "./method";

class NailyExpWebCorePlugin<Request, Response, NextFunction> implements NPlugin {
  constructor(
    private readonly adapter: NExpAdapter<Response, Request, NextFunction>,
    private readonly webCore: NailyExpWebCore<Request, Response, NextFunction>,
    private readonly port: number,
    private readonly callBack?: (port: number) => any
  ) {}

  install(container: NContainer): void {
    const allElements = container.getMap();
    for (const [_key, value] of allElements) {
      if (value.type !== "class") continue;
      const controllerPath: string = Reflect.getMetadata(NailyWebWatermark.CONTROLLER, value.target);
      if (!controllerPath) continue;
      this.webCore.initHandler(controllerPath, value);
    }
    this.adapter.listen(this.port, this.callBack);
  }
}

export class NailyExpWebPlugin<Request, Response, NextFunction> {
  private readonly webCore = new NailyExpWebCore(this.adapter);

  constructor(private readonly adapter: NExpAdapter<Request, Response, NextFunction>) {}

  use(handler: (req: Request, res: Response, next: NextFunction) => any): this {
    this.adapter.use((req, res, next) => {
      return handler(req as unknown as Request, res as unknown as Response, next);
    });
    return this;
  }

  usePipe(pipe: Type<NPipe>): this {
    this.webCore.initGlobalPipe(pipe);
    return this;
  }

  listen(port: number, callback?: (port: number) => any) {
    return new NailyExpWebCorePlugin(this.adapter, this.webCore, port, callback);
  }
}
