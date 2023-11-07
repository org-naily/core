import { Injectable, NInjectableOptions, NailyFactory, ScopeOption, Type } from "@naily/core";
import { NailyWebWatermark } from "../constants";

export function Controller(path: string = "/", injectableOptions?: NInjectableOptions) {
  return (target: Type) => {
    Reflect.defineMetadata(NailyWebWatermark.CONTROLLER, path, target);
    Injectable(injectableOptions)(target);
    target.prototype = NailyFactory.pipe(target).createInstance();
  };
}

export function Catch(error: any, injectableOptions?: NInjectableOptions) {
  return (target: Type) => {
    Reflect.defineMetadata(NailyWebWatermark.FILTER, error, target);
    Injectable(injectableOptions)(target);
    target.prototype = NailyFactory.pipe(target).createInstance();
  };
}
