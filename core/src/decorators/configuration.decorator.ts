import { Injectable, NIoc, NailyInjectableFactory, NailyWatermark, Type } from "..";

export function Configuration(options?: NIoc.InjectableOptions) {
  return (target: Type) => {
    Injectable(options)(target);
    Reflect.defineMetadata(NailyWatermark.CONFIGURATION, true, target);

    const prototype = new NailyInjectableFactory(target).create();
    target.prototype = prototype;
  };
}
