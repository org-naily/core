import { NailyIOCWatermark } from "../constants";
import { NailyFactoryContext } from "../containers";
import { Scope, Type } from "../typings";
import { createFactoryClassDecorator } from "../utils";

export function Constant<T extends any>(token: string, value: T) {
  return createFactoryClassDecorator({
    factories: [NailyFactoryContext],
    token: token,
    type: "constant",
    value: value,
    beforeExecute(target) {
      Reflect.defineMetadata(NailyIOCWatermark.CONSTANT, value, target);
    },
  });
}
