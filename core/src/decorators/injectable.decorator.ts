import "reflect-metadata";
import { Type } from "@/typings/common.typing";
import { NailyWatermark, ScopeEnum } from "@/constants";
import { NIoc } from "@/typings/inject.typing";
import { generateToken } from "@/utils/generate";

export function Injectable<T = any>(options: NIoc.InjectableOptions = { scope: ScopeEnum.SINGLETON, token: generateToken() }) {
  return (target: Type<T>) => {
    const oldOptions: NIoc.InjectableOptions = Reflect.getMetadata(NailyWatermark.INJECTABLE, target) || {};

    if (options.scope) {
      oldOptions.scope = options.scope;
    } else {
      oldOptions.scope = ScopeEnum.SINGLETON;
    }

    if (options.token) {
      oldOptions.token = options.token;
    } else {
      oldOptions.token = generateToken();
    }

    Reflect.defineMetadata(NailyWatermark.INJECTABLE, oldOptions, target);
  };
}
