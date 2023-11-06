import { Injectable, NailyFactory, ScopeOption, Type } from "@naily/core";
import { NailyWebWatermark } from "../constants";

export function Controller(path: string = "/") {
  return (target: Type) => {
    Reflect.defineMetadata(NailyWebWatermark.CONTROLLER, path, target);
    Injectable()(target);
    target.prototype = NailyFactory.pipe(target).createInstance();
  };
}
