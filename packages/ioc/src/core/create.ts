import { Type } from "../typings";

export function createClassDecorator<R, T extends $.Impl.Ioc.Factory = $.Impl.Ioc.Factory>(
  factoryContext: T[],
  callBack?: (target: Type) => void,
  token?: string
) {
  return (target: Type<R>) => {
    factoryContext.forEach((factory) => {
      factory.add(target);
    });
    if (callBack) callBack(target);
  };
}
