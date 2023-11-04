import { Injectable, Type } from "@naily/core";
import { NailyWebWatermark } from "../constants";

export function Controller(path: string = "/") {
  return (target: Type) => {
    Reflect.defineMetadata(NailyWebWatermark.CONTROLLER, path, target);
    Injectable()(target);
  };
}
