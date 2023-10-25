import "reflect-metadata";
import { Type } from "../typings/common.typing";
import { INailyFactory } from "../typings/factory.typing";
import { NailyBaseFactory } from "./base.factory";
import { Factory } from "../decorators/factory.decorator";

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

export class NailyFactoryRepositoryGetter {
  constructor(private readonly instance: INailyFactory.INailyFactoryInstance) {}

  public getClass() {
    return this.instance.target;
  }

  public getInstance() {
    return this.instance.instance;
  }

  public getClassName() {
    return this.instance.target.name;
  }
}

export class NailyFactoryRepository {
  private static readonly NailyFactoryContext = new NailyFactory();

  public static get<T extends string>(key: T): NailyFactoryRepositoryGetter {
    const injectable = this.NailyFactoryContext.get(key);
    return new NailyFactoryRepositoryGetter(injectable);
  }
}
