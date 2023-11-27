import { NailyFactory } from "../classes";
import { Type } from "../typings";

export function UseAdvice(...advices: NAOP.Advice[] | Type<NAOP.Advice>[]): MethodDecorator;
export function UseAdvice(...advices: NAOP.Advice[] | Type<NAOP.Advice>[]) {
  return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) => {
    const oldMethod = target[propertyKey] as Function;
    const advicesClass = advices.map((advice: NAOP.Advice | Type<NAOP.Advice>) => {
      if (typeof advice === "function") {
        return new NailyFactory(advice).createInstance();
      } else {
        return advice;
      }
    });
    descriptor.value = async (...args: any[]) => {
      try {
        for (const advice of advicesClass) {
          await advice.before?.(target, target.constructor as Type, propertyKey);
        }
        let result = await oldMethod.call(target, ...args);
        for (const advice of advicesClass) {
          const returnValue = await advice.after?.(target, target.constructor as Type, propertyKey, result);
          result = returnValue;
        }
        return result;
      } catch (error) {
        for (const advice of advicesClass) {
          await advice.throw?.(target, target.constructor as Type, propertyKey, error);
        }
      }
    };
  };
}
