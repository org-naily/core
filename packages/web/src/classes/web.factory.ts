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
export class NailyExpWebFactory {
  constructor(private readonly adapter: NExpAdapter) {}

  public static create(adapter: NExpAdapter): NailyExpWebFactory {
    const map = NailyFactory.container.getMap().values();
    for (const item of map) {
      if (item.type !== "class") continue;
      const controller: string = Reflect.getMetadata(NailyWebWatermark.CONTROLLER, item.target);
      if (!controller) continue;
    }

    return new NailyExpWebFactory(adapter);
  }

  public listen(port: number, callBack: (port: number) => void) {
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
          const methodParamtypes = pipe.getParamtypesByPropertykey(key);
          const parameter: NPipe.PipeMetadata[] = Reflect.getMetadata(NailyWebWatermark.PIPE, item.target.prototype, key) || [];

          new NailyExpWebHandler(this.adapter).init(path, method.method, item, key);
        });
      }
    }
    return this.adapter.listen(port, callBack);
  }
}
