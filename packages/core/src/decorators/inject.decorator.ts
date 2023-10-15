import { WATERMARK } from "../constants/watermark.constant";
import { Type } from "../typings/common.typing";

export function Inject(val: Type) {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(WATERMARK.INJECT, val, target, propertyKey);
    target[propertyKey] = val;
  };
}

export function Autowired(target: Object, propertyKey: string | symbol) {
  const typing = Reflect.getMetadata("design:type", target, propertyKey);
  if (!typing || typeof typing !== "function") throw new TypeError(`Cannot inject ${propertyKey.toString()}`);
  Inject(typing)(target, propertyKey);
}
