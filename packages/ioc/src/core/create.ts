import { NailyFactoryContext } from "../factories";
import { Type } from "../typings";

export function createClassDecorator<R, T extends $.Impl.Ioc.Factory>(factoryContext: T[], callBack?: (target: Type) => Type | void, token?: string) {
  return (target: Type<R>) => {
    factoryContext.forEach((factory) => {
      factory.add(target, token);
    });
    if (callBack) return callBack(target);
  };
}

export function createNailyApplication(...plugins: $.Impl.Ioc.Plugin[]) {
  for (let i = 0; i < plugins.length; i++) {
    plugins[i].install(NailyFactoryContext);
  }

  NailyFactoryContext.getMap();
}
