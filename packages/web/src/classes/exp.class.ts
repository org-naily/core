import { Injectable, NailyInjectableFactory, Value } from "@naily/core";
import { NExpAdapter } from "@/typings";
import { NailyWebManager } from "./manager.class";
import { NailyWebWatermark } from "@/constants";
import { NWeb } from "@/typings/common.typing";
import { join } from "path";

class ExpHandler {
  private allControllers = NailyWebManager.getAllControllers();
  constructor(private readonly adapter: NExpAdapter) {
    this.analyzeHandler();
  }

  private analyzeHandler() {
    for (const controller of this.allControllers) {
      const controllerRepository = new NailyInjectableFactory(controller.target);
      const propertykeys = controllerRepository.getPrototypeOwnkeys();
      const { path: controllerPath } = NailyWebManager.getControllerMetadataOrThrow(controller.target);

      for (const key of propertykeys) {
        const allMethods: NWeb.NMethodMetadata[] = Reflect.getMetadata(NailyWebWatermark.CONTROLLER_METHOD, controller.target.prototype, key) || [];
        allMethods.forEach(({ method, path }) => {
          this.adapter.handler({
            getHandler: async () => {
              const func: Function = controller.instance[key];
              return {
                value: await func.call(controller.instance),
                haveError: false,
              };
            },
            getPath: () => join("/" + controllerPath, path).replace(/\\/g, "/"),
            getHttpMethod: () => method,
          });
        });
      }
    }
  }
}

@Injectable()
export class NailyExpWebFactory<Request, Response, NextFunction extends Function> {
  @Value("naily.web.port")
  private readonly port: number;

  constructor(private readonly adapter: NExpAdapter<Request, Response, NextFunction>) {}

  public useMiddleware(handler: (req: Request, res: Response, next: NextFunction) => void): this {
    this.adapter.middleware(handler);
    return this;
  }

  public run() {
    if (!this.port) throw new Error(`[Naily] [Web] Port is not defined.`);
    new ExpHandler(this.adapter);
    return new Promise<number>((res) => {
      this.adapter.listen(this.port, () => {
        res(this.port);
      });
    });
  }
}
