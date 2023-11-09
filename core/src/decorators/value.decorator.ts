import "reflect-metadata";
import { NailyWatermark } from "@/constants";

export function Value(jexl: string) {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(NailyWatermark.VALUE, jexl, target, propertyKey);
    Object.defineProperty(target, propertyKey, {
      get() {
        return jexl;
      },
    });
  };
}
