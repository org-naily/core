import { NExpWebAdvice } from "@/typings/common.typing";
import { Configuration, NailyInjectableFactory, Type } from "@naily/core";
import { NailyWebWatermark } from "..";

export function UseAdvice(...advices: Type<NExpWebAdvice>[]) {
  return function (target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) {
    Reflect.defineMetadata(
      NailyWebWatermark.USEADVICE,
      advices.map((advice) => new NailyInjectableFactory(advice).create()),
      target,
      propertyKey
    );
  };
}
