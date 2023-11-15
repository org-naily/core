import { NailyConfiguration } from "@/vendors";
import { NConfigure, Type } from "@/typings";
import { NailyFactory, NailyRepository } from "@/classes";
import sp from "synchronized-promise";
import JEXL from "jexl";

export function Value(jexl?: string, configure: Type<NConfigure> = NailyRepository.defaultConfigure) {
  return (target: Object, propertyKey: string | symbol) => {
    Object.defineProperty(target, propertyKey, {
      get() {
        const Factory = new NailyFactory(configure).create();
        return sp(Factory.getConfigure.bind(Factory, jexl, JEXL))();
      },
    });
  };
}
