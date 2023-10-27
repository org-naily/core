import { NailyFactoryContext, Type, createClassDecorator } from "@naily/ioc";
import { NailyAopWatermark } from "../constants/watermark.constant";
import { NailyAspectFactoryContext } from "../factories/aspect.factory";

export function Aspect(token?: string) {
  return createClassDecorator(
    [NailyFactoryContext, NailyAspectFactoryContext],
    (target) => {
      Reflect.defineMetadata(NailyAopWatermark.ASPECT, true, target);
    },
    token
  );
}

export function Before(...beforeHandlers: Type<$.Impl.Aop.Before>[]) {
  return <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
    Reflect.defineMetadata(NailyAopWatermark.BEFORE, beforeHandlers, target, propertyKey);
  };
}

export function After(...afterHandlers: Type<$.Impl.Aop.After>[]) {
  return <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
    Reflect.defineMetadata(NailyAopWatermark.AFTER, afterHandlers, target, propertyKey);
  };
}
