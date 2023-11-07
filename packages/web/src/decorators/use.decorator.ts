import { Type } from "@naily/core";
import { NFilter } from "../typings";
import { NailyWebWatermark } from "../constants";

export function UseFilters(...filters: Type<NFilter>[]) {
  return (target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) => {
    const oldFilters: Type<NFilter>[] = Reflect.getMetadata(NailyWebWatermark.USEFILTER, target, propertyKey) || [];
    oldFilters.push(...filters);
    Reflect.defineMetadata(NailyWebWatermark.USEFILTER, oldFilters, target, propertyKey);
  };
}
