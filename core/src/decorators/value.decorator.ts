import "reflect-metadata";
import * as JEXL from "jexl";
import { NailyWatermark, ScopeEnum } from "@/constants";
import { Type, NailyConfiguration, NConfigure, NIoc } from "..";

interface ValueConfigureType extends Object {}
interface ValueConfigureType extends NConfigure {}

export function Value(jexl: string, configure: Type<ValueConfigureType> | ValueConfigureType = NailyConfiguration) {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(NailyWatermark.VALUE, jexl, target, propertyKey);
    if (typeof configure === "function") {
      configure = new configure();
    }
    const injectableOptions: NIoc.InjectableOptions = Reflect.getMetadata(NailyWatermark.INJECTABLE, configure.constructor);
    const data = (() => {
      if (injectableOptions.scope === ScopeEnum.SINGLETON) return configure.getConfigure(jexl);
    })();

    Object.defineProperty(target, propertyKey, {
      get: () => {
        if (injectableOptions.scope === ScopeEnum.TRANSIENT) {
          return (configure as ValueConfigureType).getConfigure(jexl);
        } else {
          return data;
        }
      },
    });
  };
}
