import { Class, NLifeCycle, Type } from "@naily/core";
import { Scope } from "@naily/core/dist/constants/watermark.constant";
import { NailyWebWatermark } from "../constants/warermark.constant";

export function Controller(path: string = "/", token?: string, scope: Scope = Scope.SINGLETON) {
  return (target: Type<NLifeCycle>) => {
    Reflect.defineMetadata(NailyWebWatermark.CONTROLLER, path, target);
    Class(token, scope)(target);
  };
}

export function Get(path: string = "/") {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(NailyWebWatermark.GET, path, target, propertyKey);
  };
}
