import "reflect-metadata";
import { isClass } from "is-class";
import { NailyIocWatermark } from "../constants/watermark.constant";
import { Type } from "../typings";

export function Inject(val: Type) {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(NailyIocWatermark.INJECT, val, target, propertyKey);
    target[propertyKey] = undefined;
  };
}

export function Autowired(target: Object, propertyKey: string | symbol) {
  const typing: Type = Reflect.getMetadata("design:type", target, propertyKey);
  if (!isClass(typing)) throw new TypeError(`The ${target.constructor.name}'s type of ${String(propertyKey)} is not a class`);
  Inject(typing)(target, propertyKey);
}
