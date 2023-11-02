import "reflect-metadata";
import { isClass } from "is-class";
import { NailyIocWatermark, Scope } from "../constants/watermark.constant";
import { NLifeCycle, Type } from "../typings";
import { NailyClassFactory } from "../classes";

export function Inject(val: Type<NLifeCycle>) {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(NailyIocWatermark.INJECT, val, target, propertyKey);
    const scope: Scope = Reflect.getMetadata(NailyIocWatermark.SCOPE, val);
    if (!scope) throw new Error(`Cannot find ${val.name}'s Scope`);

    const classFactory = new NailyClassFactory();
    const instance = classFactory.getClassInstance(val);
    if (scope === Scope.SINGLETON) {
      target[propertyKey] = instance;
    } else if (scope === Scope.TRANSIENT) {
      target[propertyKey] = classFactory.transformInstanceToProxy(instance, instance.constructor as Type);
    }
  };
}

export function Autowired(target: Object, propertyKey: string | symbol) {
  const typing: Type = Reflect.getMetadata("design:type", target, propertyKey);
  if (!isClass(typing)) throw new TypeError(`The ${target.constructor.name}'s type of ${String(propertyKey)} is not a class`);
  Inject(typing)(target, propertyKey);
}
