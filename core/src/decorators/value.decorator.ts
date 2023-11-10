import "reflect-metadata";
import { NailyWatermark, ScopeEnum } from "@/constants";
import { Type, NailyConfiguration, NConfigure, NailyInjectableFactory } from "..";
import { isClass } from "is-class";

interface ValueConfigureType extends Object {}
interface ValueConfigureType extends NConfigure {}

export function Value(jexl: string, configure: Type<ValueConfigureType> | ValueConfigureType = NailyConfiguration) {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(NailyWatermark.VALUE, jexl, target, propertyKey);
    if (isClass(configure)) configure = new NailyInjectableFactory(configure).create();
    const injectableOptions = new NailyInjectableFactory(configure.constructor as Type).getInjectableOptionsOrThrow();
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
