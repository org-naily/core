import "reflect-metadata";
import { isClass } from "is-class";
import { Type, NailyConfiguration, NConfigure, NailyInjectableFactory, NailyWatermark, ScopeEnum } from "..";

export interface ValueConfigureType extends Object {}
export interface ValueConfigureType extends NConfigure {}

export function Value(jexl: string, configure: Type<ValueConfigureType> | ValueConfigureType = NailyConfiguration) {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(NailyWatermark.VALUE, jexl, target, propertyKey);
    if (isClass(configure)) configure = new NailyInjectableFactory(configure).create();
    const injectableOptions = new NailyInjectableFactory(configure.constructor as Type).getInjectableOptionsOrThrow();
    const data = (() => {
      if (injectableOptions.scope === ScopeEnum.SINGLETON) return configure.getConfigure(jexl);
    })();

    const isSuccess = Reflect.defineProperty(target, propertyKey, {
      get: () => {
        if (injectableOptions.scope === ScopeEnum.PROTOTYPE) {
          return (configure as ValueConfigureType).getConfigure(jexl);
        } else {
          return data;
        }
      },
    });
    if (!isSuccess) throw new Error(`Cannot inject ${jexl} value to ${propertyKey.toString()}`);
  };
}
