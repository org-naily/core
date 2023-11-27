import { isClass } from "is-class";
import { NailyFactory, NailyRegistry } from "../classes";
import { Type } from "../typings";

export function Inject(val: string | symbol, optional?: boolean): PropertyDecorator;
export function Inject(val: Type, optional?: boolean): PropertyDecorator;
export function Inject(val: string | symbol | Type, optional: boolean = false) {
  return (target: Object, propertyKey: string | symbol) => {
    target[propertyKey] = (() => {
      if (isClass(val)) {
        return new NailyFactory(val).createInstance();
      } else {
        const value = NailyRegistry.map.get(val);
        if (!value && !optional) throw new Error(`Value ${String(val)} not found`);
        if (value.type !== "class") throw new TypeError(`Value ${String(val)} is not a class`);
        return new NailyFactory(value.target as Type).createInstance();
      }
    })();
  };
}

export function Autowired(target: Object, propertyKey: string | symbol) {
  const typing = Reflect.getMetadata("design:type", target, propertyKey);
  if (!typing || typeof typing !== "function")
    throw new Error(
      `Cannot find type of ${String(
        propertyKey
      )}. Please check your tsconfig.json file and set "emitDecoratorMetadata" to true. See https://www.typescriptlang.org/docs/handbook/decorators.html#metadata. If you cannot use this option, use @Inject decorator instead.`
    );
  Inject(typing)(target, propertyKey);
}
