import { Injectable, NailyFactory, Type } from "@naily/core";
import { NailyWebWatermark } from "../constants";
import { NExpAdapter, NPipe } from "../typings";
import { IMethod } from "../typings/method.typing";
import { NailyExpWebHandler } from "./handler.factory";
import { join } from "path";

function Factory() {
  return (target: Type) => {
    Injectable()(target);
    target.prototype = NailyFactory.pipe(target).createInstance();
  };
}

@Factory()
export class NailyExpWebFactory<Request = any, Response = any, NextFunction extends Function = Function> {
  constructor(private readonly adapter: NExpAdapter<Request, Response, NextFunction>) {}

  public static create(adapter: NExpAdapter): NailyExpWebFactory {
    const map = NailyFactory.container.getMap().values();
    for (const item of map) {
      if (item.type !== "class") continue;
      const controller: string = Reflect.getMetadata(NailyWebWatermark.CONTROLLER, item.target);
      if (!controller) continue;
    }

    return new NailyExpWebFactory(adapter);
  }

  public useMiddleware(handler: (req: Request, res: Response, next: NextFunction) => void): this {
    this.adapter.useMiddleware(handler);
    return this;
  }

  public listen<T>(port: number, callBack: (port: number) => void): T {
    const elements = NailyFactory.container.getMap().values();
    Out: for (const item of elements) {
      if (item.type !== "class") continue;
      const controllerPath: string = Reflect.getMetadata(NailyWebWatermark.CONTROLLER, item.target);
      if (!controllerPath) continue Out;
      const pipe = NailyFactory.pipe(item.target);
      const ownKey = pipe.getPrototypeOwnkeys();

      In: for (const key of ownKey) {
        if (typeof item.instance[key] !== "function") continue In;
        const methods: IMethod[] = Reflect.getMetadata(NailyWebWatermark.METHOD, item.target.prototype, key) || [];
        methods.forEach((method) => {
          const path = join("/" + controllerPath, method.path).replace(/\\/g, "/");
          new NailyExpWebHandler(this.adapter).init(path, method.method, item, key);
        });
      }
    }
    return this.adapter.listen<T>(port, callBack);
  }
}
