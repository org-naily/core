import "reflect-metadata";
import { Type } from "@/typings/common.typing";
import { NailyWatermark } from "@/constants";
import { NIoc } from "@/typings/inject.typing";

export function Injectable<T = any>(options: NIoc.InjectableOptions = {}) {
  return (target: Type<T>) => {
    const oldOptions: NIoc.InjectableOptions = Reflect.getMetadata(NailyWatermark.INJECTABLE, target) || {};
    if (options.scope) oldOptions.scope = options.scope;
    if (options.token) oldOptions.token = options.token;
    Reflect.defineMetadata(NailyWatermark.INJECTABLE, oldOptions, target);
  };
}
