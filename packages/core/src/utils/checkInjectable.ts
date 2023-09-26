import { WATERMARK } from "../constants/key";
import { Type } from "../typings";

export function checkInjectable(target: Type): boolean | undefined {
  return Reflect.getMetadata(WATERMARK.INJECTABLE, target);
}

export function checkInjectableScope(target: Type) {
  return Reflect.getMetadata(WATERMARK.INJECTABLESCOPE, target);
}
