import { WATERMARK } from "../constants/watermark.constant";
import { INailyBeanAfterExecute, INailyBeanBeforeExecute, Type } from "../typings/common.typing";

export function Bean(before: Type<INailyBeanBeforeExecute>[] = [], after: Type<INailyBeanAfterExecute>[] = []) {
  return function (target: Object, propertyKey: string | symbol) {
    Reflect.defineMetadata(WATERMARK.BEFORE_EXECUTE, before, target, propertyKey);
    Reflect.defineMetadata(WATERMARK.AFTER_EXECUTE, after, target, propertyKey);
  };
}
