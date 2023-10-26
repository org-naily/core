import { INailyFactory, NailyFactoryConstant } from "@naily/core";
import { INailyWeb } from "../typings";
import { NailyWebFactoryRepository } from "../factories";
import { NailyWebConstant, NailyWebMethodConstant, NailyWebParamConstant } from "../constants";
import { join } from "path";

export class NailyWebInitHook<Request, Response, NextFunction extends Function> {
  private readonly methodKey: (string | symbol)[] = [];

  constructor(
    private readonly repository: NailyWebFactoryRepository,
    private readonly instance: INailyFactory.INailyFactoryInstance,
    private readonly webAdapter: INailyWeb.ExpAdapter<Request, Response, NextFunction>
  ) {
    const token: string = Reflect.getMetadata(NailyFactoryConstant.INJECTABLE, instance.target);
    this.methodKey = repository.get(token).getTargetOwnKey();
  }

  getPath() {
    const controllerPath = Reflect.getMetadata(NailyWebConstant.CONTROLLER, this.instance.target);
    const path = Reflect.getMetadata(NailyWebMethodConstant.GET, this.instance.target.prototype);
    return join("/" + controllerPath, path).replace(/\\/g, "/");
  }
}
