import { NIoc, Type } from "@/typings";
import { NailyWatermark } from "@/constants";
import { NailyInjectableFactory } from "@/classes";
import { Injectable } from "@/decorators";

export function Configuration(options?: NIoc.InjectableOptions) {
  return (target: Type) => {
    Injectable(options)(target);
    Reflect.defineMetadata(NailyWatermark.CONFIGURATION, true, target);

    target.prototype = new NailyInjectableFactory(target).create();
  };
}
