import { NailyConfWatermark } from "../constants/watermark.constant";

export function Value(jexl: string, dynamic: boolean = false): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(
      NailyConfWatermark.VALUE,
      {
        jexl,
        dynamic,
      },
      target,
      propertyKey,
    );
    target[propertyKey] = undefined;
  };
}
