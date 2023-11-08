import { NailyInjectableFactory } from "../classes/injectable.class";
import { Type } from "../typings";
import { NAdvice } from "../typings";

export function Aspect(...advices: Type<NAdvice>[]) {
  return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    const old: Function = descriptor.value;

    descriptor.value = (...args: any[]) => {
      const common: NAdvice.Ctx = {
        getArgs: () => args,
        getPropertyKey: () => propertyKey,
        getParamtypes: () => Reflect.getMetadata("design:paramtypes", target, propertyKey),
        getReturntype: () => Reflect.getMetadata("design:returntype", target, propertyKey),
      };

      const advicesInstance = advices.map((advice) => new NailyInjectableFactory(advice).createInstance());

      advicesInstance.forEach((advice) => {
        if (advice.whenBefore) advice.whenBefore({ ...common });
      });

      let haveErrorCatcher = false;
      advicesInstance.forEach((adv) => (adv.whenThrow ? (haveErrorCatcher = true) : null));
      if (haveErrorCatcher) {
        try {
          let result = old.call(target, ...args);
          advicesInstance.forEach((advice) => {
            if (advice.whenAfter) {
              advice.whenAfter({
                ...common,
                getReturnValue: () => result,
                setReturnValue: (newReturnValue) => (result = newReturnValue),
              });
            }
          });
          return result;
        } catch (error) {
          advicesInstance.forEach((advice) => {
            if (advice.whenThrow) advice.whenThrow({ ...common, getError: () => error });
          });
        }
      } else {
        let result = old.call(target, ...args);
        advicesInstance.forEach((advice) => {
          if (advice.whenAfter) {
            advice.whenAfter({
              ...common,
              getReturnValue: () => result,
              setReturnValue: (newReturnValue) => (result = newReturnValue),
            });
          }
        });
        return result;
      }
    };
    return descriptor;
  };
}
