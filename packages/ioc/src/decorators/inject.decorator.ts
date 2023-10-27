import { isClass } from "is-class";
import { NailyIOCWatermark } from "../constants/watermark.constant";
import { Type } from "../typings";

export function Inject<I extends Object>(value: Type<I>) {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(NailyIOCWatermark.INJECT, value, target, propertyKey);
    target[propertyKey] = undefined;
  };
}

export function Autowired(target: Object, propertyKey: string | symbol) {
  const dataTyping: Type = Reflect.getMetadata("design:type", target, propertyKey);
  if (typeof dataTyping !== "function" || !isClass(dataTyping)) {
    throw new TypeError(`Autowired decorator can only be used on class property.`);
  }
  Inject(dataTyping)(target, propertyKey);
}
