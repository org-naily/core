import { Type } from "@naily/core";
import { NFilter, NailyWebWatermark } from "..";

export function UseFilter(...filters: Type<NFilter>[]): MethodDecorator;
export function UseFilter(...filters: Type<NFilter>[]) {
  return (target: Object, propertyKey: string | symbol) => {
    const oldFilters: Type<NFilter>[] = Reflect.getMetadata(NailyWebWatermark.USEFILTER, target, propertyKey) || [];
    oldFilters.push(...filters);
    Reflect.defineMetadata(NailyWebWatermark.USEFILTER, oldFilters, target, propertyKey);
  };
}
