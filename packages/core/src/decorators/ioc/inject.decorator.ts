import { Type } from "../../typings";

export function Inject(meta: Type): PropertyDecorator {
  return (target, propertyKey) => {
    target[propertyKey] = meta;
  };
}
