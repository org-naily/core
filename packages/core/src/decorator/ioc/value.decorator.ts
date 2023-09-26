import { VALUE_WATERMARK } from "../../constant/constant";

export function Value<T extends string>(key: T): PropertyDecorator;
export function Value<T extends NailyConfig>(key: T): PropertyDecorator;
export function Value<T extends NailyConfig | string>(key: T): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    let metadatas: { key: string; propertyKey: string | symbol }[] = Reflect.getMetadata(VALUE_WATERMARK, target);
    if (!metadatas) metadatas = [];
    metadatas.push({ key, propertyKey });
    Reflect.defineMetadata(VALUE_WATERMARK, metadatas, target);
  };
}
