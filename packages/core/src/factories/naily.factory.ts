import "reflect-metadata";
import { Type } from "../typings/common.typing";
import { INailyFactory } from "../typings/factory.typing";
import { NailyBaseFactory } from "./base.factory";
import { Factory } from "../decorators/factory.decorator";
import { NailyFactoryConstant } from "../constants";
import { NailyFactoryRepositoryGetter } from "./get.factory";

@Factory
class NailyFactory extends NailyBaseFactory implements INailyFactory.INailyFactoryImpl {
  public add(target: Type, key?: string): INailyFactory.INailyFactoryInstance {
    key = super.addBase(target, key);
    const instance = new target(...this.transformConstructorParameterToInstance(target));
    this.transformInjectPropertyToInstance(target, instance);
    const nailyInstance: INailyFactory.INailyFactoryInstance = { target, instance };
    this.container.set(key, nailyInstance);
    return nailyInstance;
  }
}

export class NailyFactoryRepository {
  private static readonly ctx = new NailyFactory();

  private constructor() {}

  public static get<T extends string>(key: T): NailyFactoryRepositoryGetter {
    const injectable = this.ctx.get(key);
    return new NailyFactoryRepositoryGetter(injectable);
  }

  public static getContext(): NailyFactory {
    return this.ctx;
  }
}
