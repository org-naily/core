import { Injectable, NailyInjectableFactory, Value } from "@naily/core";
import { NExpAdapter } from "@/typings";
import { NailyWebManager } from "./manager.class";
import { NailyWebWatermark } from "@/constants";
import { NWeb } from "@/typings/common.typing";

class ExpHandler {
  private allControllers = NailyWebManager.getAllControllers();
  constructor(private readonly adapter: NExpAdapter) {
    this.analyzeHandler();
  }

  private analyzeHandler() {
    for (const controller of this.allControllers) {
      const controllerRepository = new NailyInjectableFactory(controller.target);
      const propertykeys = controllerRepository.getPrototypeOwnkeys();

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
            getPath: () => path,
            getHttpMethod: () => method,
          });
        });
      }
    }
  }
}

@Injectable()
export class NailyExpWebFactory {
  @Value("naily.web.port")
  private readonly port: number;

  constructor(private readonly adapter: NExpAdapter, callBack: (port: number) => void) {
    if (!this.port) throw new Error(`[Naily] [Web] Port is not defined.`);

    new ExpHandler(this.adapter);
    this.adapter.listen(this.port, () => {
      callBack(this.port);
    });
  }
}
