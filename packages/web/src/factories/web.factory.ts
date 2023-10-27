import { FactoryItem, NailyBaseFactory, NailyFactoryContext, NailyIOCWatermark, Type } from "@naily/ioc";

export class NailyWebFactory extends NailyBaseFactory implements $.Impl.Ioc.Factory {
  add(target: Type, token?: string): FactoryItem<any> {
    if (!token) token = Reflect.getMetadata(NailyIOCWatermark.INJECTABLE, target);
    if (!token) throw new Error(`${target.name} is not a injectable class`);
    const { instance } = NailyFactoryContext.get(token);
    return { target, instance };
  }
}

export const NailyWebFactoryContext = new NailyWebFactory();
