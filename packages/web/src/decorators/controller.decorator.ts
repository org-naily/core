import { NailyWebWatermark } from "@/constants";
import { Configuration, Injectable, NIoc, Type } from "@naily/core";

export function Controller(path: string = "/", options?: NIoc.InjectableOptions) {
  return (target: Type) => {
    Reflect.defineMetadata(
      NailyWebWatermark.CONTROLLER,
      {
        path,
      },
      target
    );
    Configuration(options)(target);
  };
}

export function Advice(options?: NIoc.InjectableOptions) {
  return (target: Type) => {
    Reflect.defineMetadata(NailyWebWatermark.ADVICE, true, target);
    Injectable(options)(target);
  };
}
