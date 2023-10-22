import "reflect-metadata";
import { NailyAOPWatermark } from "../constants";
import { Type } from "@naily/core";

export function Before(...befores: Type[]): MethodDecorator {
  return <T = Function>(target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<T>) => {
    Reflect.defineMetadata(NailyAOPWatermark.BEFORE, befores, target, propertyKey);
  };
}

export function After(...afters: Type[]): MethodDecorator {
  return <T = Function>(target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<T>) => {
    Reflect.defineMetadata(NailyAOPWatermark.AFTER, afters, target, propertyKey);
  };
}
