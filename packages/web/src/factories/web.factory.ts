import { Factory, INailyFactory, NailyBaseFactory, NailyFactoryRepository, Type } from "@naily/core";
import { NailyFactoryRepositoryGetter } from "@naily/core/dist/factories/get.factory";

@Factory
class NailyWebFactory extends NailyBaseFactory implements INailyFactory.INailyFactoryImpl {
  add(target: Type, key?: string) {
    key = super.addBase(target, key);
    const instance = new NailyFactoryRepository().get(key).getInstance();
    this.container.set(key, { target, instance });
    return { target, instance };
  }
}

export class NailyWebFactoryRepository implements INailyFactory.INailyFactoryRepository<NailyWebFactory> {
  private static readonly ctx = new NailyWebFactory();

  public get<T extends string>(key: T) {
    const injectable = NailyWebFactoryRepository.ctx.get(key);
    return new NailyFactoryRepositoryGetter(injectable);
  }

  public getContext() {
    return NailyWebFactoryRepository.ctx;
  }
}
