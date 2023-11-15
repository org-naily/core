import isClass from "is-class";
import { NailyFactory, Type } from "..";

export function Inject(injectable: Type) {
  return (target: Object, propertyKey: string | symbol) => {
    target[propertyKey] = new NailyFactory(injectable).create();
  };
}

export function Autowired(target: Object, propertyKey: string | symbol) {
  const typing = Reflect.getMetadata("design:type", target, propertyKey);
  if (!isClass(typing)) throw new TypeError("Autowiring only works with classes");
  target[propertyKey] = new NailyFactory(typing).create();
}
