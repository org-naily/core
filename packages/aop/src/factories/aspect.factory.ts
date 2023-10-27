import { FactoryItem, NailyBaseFactory, Type, NailyIOCWatermark, NailyFactoryContext } from "@naily/ioc";
import { NailyAopWatermark } from "../constants/watermark.constant";

class NailyAspectFactory extends NailyBaseFactory implements $.Impl.Ioc.Factory {
  private analyzeMessager(target: Type, instance: Object): FactoryItem<Object> {
    const ownKeys = Reflect.ownKeys(target.prototype).filter((item) => (item === "constructor" ? undefined : item));

    for (let i = 0; i < ownKeys.length; i++) {
      const key = ownKeys[i];
      const argTypes = Reflect.getMetadata("design:paramtypes", target.prototype, key);
      const returnType = Reflect.getMetadata("design:returntype", target.prototype, key);

      const beforeHandlers: Type<$.Impl.Aop.Before>[] = Reflect.getMetadata(NailyAopWatermark.BEFORE, target.prototype, key) || [];
      const beforeHandlerInstances: FactoryItem<$.Impl.Aop.Before>[] = [];
      for (let j = 0; j < beforeHandlers.length; j++) {
        const beforeHandler = beforeHandlers[j];
        const beforeHandlerToken = Reflect.getMetadata(NailyIOCWatermark.INJECTABLE, beforeHandler);
        const beforeHandlerInstance = this.container.get(beforeHandlerToken) as FactoryItem<$.Impl.Aop.Before>;
        beforeHandlerInstances.push(beforeHandlerInstance);
      }

      const afterHandlers: Type<$.Impl.Aop.After>[] = Reflect.getMetadata(NailyAopWatermark.AFTER, target.prototype, key) || [];

      const afterHandlerInstances: FactoryItem<$.Impl.Aop.After>[] = [];
      for (let j = 0; j < afterHandlers.length; j++) {
        const afterHandler = afterHandlers[j];
        const afterHandlerToken = Reflect.getMetadata(NailyIOCWatermark.INJECTABLE, afterHandler);
        const afterHandlerInstance = this.container.get(afterHandlerToken) as FactoryItem<$.Impl.Aop.After>;
        afterHandlerInstances.push(afterHandlerInstance);
      }

      const originalMethod: Function | Promise<any> = instance[key];
      if (typeof originalMethod !== "function") throw new TypeError(`Method ${key.toString()} is not a function.`);

      async function callBefore(args: any[]) {
        for (let j = 0; j < beforeHandlerInstances.length; j++) {
          const beforeHandlerInstance = beforeHandlerInstances[j];
          await beforeHandlerInstance.instance.beforeExecute({
            getArgs: () => args,
            getArgTypes: () => argTypes,
            getInstance: () => instance,
            getTarget: () => target,
            getPropertyKey: () => key,
          });
        }
      }

      async function callAfter(args: any[], value: any) {
        for (let j = 0; j < afterHandlerInstances.length; j++) {
          const afterHandlerInstance = afterHandlerInstances[j];
          await afterHandlerInstance.instance.afterExecute({
            getArgs: () => args,
            getArgTypes: () => argTypes,
            getInstance: () => instance,
            getTarget: () => target,
            getPropertyKey: () => key,
            getReturnValue: () => value,
            getReturnTypes: () => returnType,
          });
        }
      }

      const handler = (...args: any[]) => {
        let value: any[];
        callBefore(args)
          .then(async () => {
            value = await originalMethod.call(instance, ...args);
          })
          .then(() => {
            callAfter(args, value);
          });
      };

      instance[key] = handler;
      target.prototype[key] = handler;
    }
    return { target, instance };
  }

  add(target: Type): FactoryItem<any> {
    const token: string = Reflect.getMetadata(NailyIOCWatermark.INJECTABLE, target);
    if (!token) throw new TypeError(`Class ${target.name} is no a injectable.`);
    const item = NailyFactoryContext.get(token);

    const newAnalyzed = this.analyzeMessager(item.target, item.instance);
    NailyFactoryContext.rawAdd(token, newAnalyzed.target, newAnalyzed.instance);

    this.container.set(token, item);
    return item;
  }
}

export const NailyAspectFactoryContext = new NailyAspectFactory();
