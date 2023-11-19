import { NailyWebWatermark } from "@/constants";
import { Configuration, Injectable, Type } from "@org-naily/core";

export function Controller(path: string = "/") {
  return (target: Type) => {
    const oldMetadata: string[] = Reflect.getMetadata(NailyWebWatermark.CONTROLLER, target) || [];
    oldMetadata.push(path);
    Reflect.defineMetadata(NailyWebWatermark.CONTROLLER, oldMetadata, target);
    Configuration()(target);
  };
}

export function Catch(...errorInstance: Type[]) {
  return (target: Type) => {
    Reflect.defineMetadata(NailyWebWatermark.CATCH, errorInstance, target);
    Injectable()(target);
  };
}
