import { WATERMARK } from "../constants/watermark.constant";

export function Value<T extends string>(jexl?: T) {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(WATERMARK.VALUE, jexl, target, propertyKey);
  };
}
