import { Type } from "@/typings";
import { NailyFactory } from "..";
import isClass from "is-class";

export function Inject(val: Type) {
  return (target: Object, key: string | symbol) => {
    Object.defineProperty(target, key, {
      get: () => new NailyFactory(val).getInstance(),
    });
  };
}

export function Autowired(target: Object, key: string | symbol) {
  const typing = Reflect.getMetadata("design:type", target, key);
  if (!isClass<Type>(typing)) throw new Error("Autowiring only works with classes");
  Inject(typing)(target, key);
}
