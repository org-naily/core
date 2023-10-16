import { WATERMARK } from "../constants/watermark.constant";
import { INailyBeanAfterExecute, INailyBeanBeforeExecute, Type } from "../typings/common.typing";
import { Injectable } from "./injectable.decorator";

export function Aspect(scan: string = "", key?: string) {
  return function (target: Type) {
    Injectable(key)(target);
  };
}

export function Before(before: Type<INailyBeanBeforeExecute>[] = []) {
  return function (target: Object, propertyKey: string | symbol) {
    Reflect.defineMetadata(WATERMARK.BEFORE_EXECUTE, before, target, propertyKey);
  };
}

export function After(after: Type<INailyBeanAfterExecute>[] = []) {
  return function (target: Object, propertyKey: string | symbol) {
    Reflect.defineMetadata(WATERMARK.AFTER_EXECUTE, after, target, propertyKey);
  };
}
