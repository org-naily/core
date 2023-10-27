import { NailyBaseFactory } from "../core";
import { Type } from "../typings/common.typing";
import { FactoryItem } from "../typings/factory.typing";

class NailyFactory extends NailyBaseFactory implements $.Impl.Ioc.Factory {
  add<T extends Object>(target: Type<T>, token: string = NailyBaseFactory.generateToken()): FactoryItem<T> {
    super.beforeAdd(target, token);
    const instance = new target(...this.analyzeConstructorParameters(target));
    const item = { target, instance };
    this.analyzePropertyParameters(target, instance);
    this.container.set(token, item);
    return item;
  }
}

export const NailyFactoryContext = new NailyFactory();
