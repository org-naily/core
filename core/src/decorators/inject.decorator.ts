import { isClass } from "is-class";
import { NailyIOCWatermark } from "../constants";
import { Type } from "../typings";

export function Inject(classOrToken: Type | string) {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(NailyIOCWatermark.INJECT, classOrToken, target, propertyKey);
    target[propertyKey] = undefined;
  };
}

export function Autowired(target: Object, propertyKey: string | symbol) {
  const typing: Type = Reflect.getMetadata("design:type", target, propertyKey);
  if (!typing || !isClass(typing)) throw new TypeError(`${target.constructor.name}'s ${String(propertyKey)} type is not a class, cannot be inject`);
  Inject(typing)(target, propertyKey);
}
