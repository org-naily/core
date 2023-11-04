import isClass from "is-class";
import { NailyInjectableFactory } from "../classes/injectable.class";
import { NAdvice, Type } from "../typings";

export function Inject(val: Type) {
  return (target: Object, propertyKey: string | symbol) => {
    target[propertyKey] = new NailyInjectableFactory(val).createInstance();
  };
}

export function Autowired(target: Object, propertyKey: string | symbol) {
  const typing = Reflect.getMetadata("design:type", target, propertyKey);
  if (!isClass(typing)) throw new TypeError(`${typing} is no a class.`);
  Inject(typing)(target, propertyKey);
}
