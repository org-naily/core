import { VALUE_WATERMARK } from "../../constant/constant";

export function Value(target: Object, propertyKey: string | symbol) {
  Reflect.defineMetadata(VALUE_WATERMARK, true, target, propertyKey);
}
