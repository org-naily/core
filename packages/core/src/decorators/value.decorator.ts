import { WATERMARK } from "../constants/watermark.constant";

export function Value(jexl: string) {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(WATERMARK.VALUE, jexl, target, propertyKey);
  };
}
