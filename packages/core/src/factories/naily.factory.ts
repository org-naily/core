import "reflect-metadata";
import { Type } from "../typings/common.typing";
import { INailyFactory } from "../typings/factory.typing";
import { NailyBaseFactory } from "./base.factory";
import { Factory } from "../decorators/factory.decorator";

@Factory
class NailyFactory extends NailyBaseFactory implements INailyFactory.INailyFactoryImpl {
  public add(target: Type, key?: string): INailyFactory.INailyFactoryInstance {
    super.add(target, key);
    this.transformInjectPropertyToInstance(target);
    const instance = new target(...this.transformConstructorParameterToInstance(target));
    const nailyInstance: INailyFactory.INailyFactoryInstance = { target, instance };
    return nailyInstance;
  }
}

export const NailyFactoryContext = new NailyFactory();
