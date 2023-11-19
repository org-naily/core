import { NConfigure, NToken, Type } from "@/typings";
import { NailyFactory, NailyRepository } from "@/classes";
import isClass from "is-class";
import { NailyConfiguration } from "@/vendors/naily.configuration";

export function Value(jexl?: string, configure?: NConfigure | Type<NConfigure>): PropertyDecorator;
export function Value(jexl: string = "", configure: NConfigure | Type<NConfigure> = NailyConfiguration) {
  return function (target: Object, propertyKey: string | symbol) {
    let token: NToken;
    if (isClass<Type<NConfigure>>(configure)) {
      const Factory = new NailyFactory(configure);
      configure = Factory.getInstance() as NConfigure;
      token = Factory.getInjectableOptionsOrThrow().Token;
    } else {
      const Factory = new NailyFactory(configure.constructor as Type<NConfigure>);
      token = Factory.getInjectableOptionsOrThrow().Token;
    }
    const element = NailyRepository.getClassElement(token);
    const builder = NailyFactory.getJexlBuilder();
    const value = builder.evalSync(jexl, element.configure.value);

    Object.defineProperty(target, propertyKey, {
      get: () => value,
    });
  };
}
