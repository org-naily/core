import { Injectable, NContainer, NailyInjectableFactory, Value } from "@naily/core";
import { NExpAdapter } from "@/typings";
import { NailyWebManager } from "./manager.class";
import { NailyWebWatermark } from "@/constants";
import { NExpWebAdvice, NWeb } from "@/typings/common.typing";
import { join } from "path";
import { NailyWebException } from "@/errors";

interface NExpHandlerOptions {
  advices: NExpWebAdvice[];
  paramtypes: any[];
}

class ExpHandler {
  private allControllers = NailyWebManager.getAllControllers();

  constructor(private readonly adapter: NExpAdapter) {
    this.analyzeHandler();
  }

  private async handler(
    controller: NContainer.ClassElement<Object>,
    key: string | symbol,
    options: NExpAdapter.NExpAdapterHandlerArgument,
    some: NExpHandlerOptions,
  ): Promise<NExpAdapter.NExpAdapterHandlerReturn> {
    let isSended = false;
    for (const advice of some.advices) {
      if (isSended) return { value: undefined, haveError: false, isSended: true };
      if (advice.beforeExecution) {
        isSended = await advice.beforeExecution({
          getRequest: () => options.request,
          getResponse: () => options.response,
          getParamTypes: () => some.paramtypes,
        });
      }
    }
    try {
      const func: Function = controller.instance[key];
      let funcValue = await func.call(controller.instance);

      for (const advice of some.advices) {
        if (isSended) return { value: undefined, haveError: false, isSended: true };
        if (advice.afterExecution) {
          isSended = await advice.afterExecution({
            getRequest: () => options.request,
            getResponse: () => options.response,
            getParamTypes: () => some.paramtypes,
            getResponseValue: () => funcValue,
            setResponseValue: (newValue) => (funcValue = newValue),
          });
        }
      }

      return {
        value: funcValue,
        haveError: false,
        isSended: isSended ? true : false,
      };
    } catch (error) {
      for (const advice of some.advices) {
        if (isSended) return;
        if (advice.onError) {
          isSended = await advice.onError(error, {
            getRequest: () => options.request,
            getResponse: () => options.response,
            getParamTypes: () => some.paramtypes,
          });
        }
      }
      return {
        value: undefined,
        haveError: true,
        isSended: isSended ? true : false,
      };
    }
  }

  private analyzeHandler() {
    for (const controller of this.allControllers) {
      const controllerRepository = new NailyInjectableFactory(controller.target);
      const propertykeys = controllerRepository.getPrototypeOwnkeys();
      const { path: controllerPath } = NailyWebManager.getControllerMetadataOrThrow(controller.target);

      for (const key of propertykeys) {
        const allMethods: NWeb.NMethodMetadata[] = Reflect.getMetadata(NailyWebWatermark.CONTROLLER_METHOD, controller.target.prototype, key) || [];
        const allAdvices: NExpWebAdvice[] = Reflect.getMetadata(NailyWebWatermark.USEADVICE, controller.target.prototype, key) || [];
        const paramtypes: any[] = Reflect.getMetadata("design:paramtypes", controller.target.prototype, key) || [];

        for (const { method, path } of allMethods) {
          this.adapter.handler({
            getHandler: (options) => {
              return this.handler(controller, key, options, {
                advices: allAdvices,
                paramtypes: paramtypes,
              });
            },
            getPath: () => join("/" + controllerPath, path).replace(/\\/g, "/"),
            getHttpMethod: () => method,
          });
        }
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
    if (!this.port) throw new NailyWebException(`[Web] naily.yaml: Port is not defined.`);
    new ExpHandler(this.adapter);
    return new Promise<number>((res) => {
      this.adapter.listen(this.port, () => {
        res(this.port);
      });
    });
  }
}
