import { NailyIocWatermark } from "../constants/watermark.constant";
import { Type } from "../typings";
import { NConfiguration } from "../typings";
import { NailyConfiguration } from "../vendors/naily.configuration";

export function Value(jexl: string, configure: Type<NConfiguration> = NailyConfiguration) {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(NailyIocWatermark.VALUE, { jexl, configure }, target, propertyKey);
    target[propertyKey] = undefined;
  };
}
