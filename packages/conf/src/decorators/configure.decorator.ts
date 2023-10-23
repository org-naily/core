import { NailyIOCWatermark, NailyInjectableContext, RxType, Type } from "@naily/core";
import { NailyStaticConfiguration } from "..";
import { NailyConfWatermark } from "../constants/watermark.constant";

export function Configure(configure: RxType<NailyStaticConfiguration>) {
  return (target: Type) => {
    const instance = new configure();
    Reflect.defineMetadata(
      NailyConfWatermark.CONFIGURE,
      {
        target: configure,
        instance,
      },
      target,
    );

    const injectableKeys: string = Reflect.getMetadata(NailyIOCWatermark.INJECTABLE, target);
    if (!injectableKeys) throw new Error(`Configure class ${configure.name} must be injectable.`);
    const injectable = NailyInjectableContext.get(injectableKeys);
    const properties = Reflect.ownKeys(target.prototype).filter((key) => (key === "constructor" ? undefined : key));
    properties.forEach((propertyKey) => {
      const jexl = Reflect.getMetadata(NailyConfWatermark.VALUE, target.prototype, propertyKey);
      injectable.instance[propertyKey] = instance.get(jexl.jexl);
    });
  };
}
