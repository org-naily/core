import { WATERMARK } from "../constants/watermark.constant";
import { NailyConfigure } from "../vendors/configure.class";

export function Value<T extends string>(jexl?: T) {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(WATERMARK.VALUE, jexl, target, propertyKey);
    target[propertyKey] = NailyConfigure.getConfigureByJexl(jexl);
  };
}
