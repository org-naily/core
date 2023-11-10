import { isClass } from "is-class";
import { NailyInjectableFactory, NailyWatermark, Type } from "..";

export function Inject(val: Type) {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(NailyWatermark.INJECT, val, target, propertyKey);
    Object.defineProperty(target, propertyKey, {
      get: () => {
        return new NailyInjectableFactory(val).create();
      },
    });
  };
}

export function Autowired(target: Object, propertyKey: string | symbol) {
  const typing: Type = Reflect.getMetadata("design:type", target, propertyKey);
  if (!typing) {
    throw new Error(
      `Cannot get type of ${propertyKey.toString()}, please check if you have enabled the 'emitDecoratorMetadata' option in tsconfig.json`
    );
  }
  if (!isClass(typing)) {
    throw new TypeError(`Cannot inject a non-class type ${typing} to ${propertyKey.toString()}`);
  }
  Inject(typing)(target, propertyKey);
}
