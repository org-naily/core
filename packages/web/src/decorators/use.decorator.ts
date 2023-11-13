import { NExpWebAdvice } from "@/typings/common.typing";
import { NailyInjectableFactory, Type } from "@naily/core";
import { NailyWebWatermark } from "..";

export function UseAdvice(...advice: (Type<NExpWebAdvice> | NExpWebAdvice)[]) {
  return function (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) {
    Reflect.defineMetadata(
      NailyWebWatermark.USEADVICE,
      advice.map((advice) => (typeof advice === "function" ? new NailyInjectableFactory(advice).create() : advice)),
      target,
      propertyKey
    );
  };
}
