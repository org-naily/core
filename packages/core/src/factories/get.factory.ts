import { NailyFactoryConstant } from "../constants";
import { INailyFactory, Type } from "../typings";

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

  public getTargetOwnKey() {
    return Reflect.ownKeys(this.instance.target.prototype).filter((key) => (key === "constructor" ? undefined : key));
  }

  public getInjects(): Type[] {
    return Reflect.getMetadata(NailyFactoryConstant.INJECT, this.instance.target) || [];
  }
}
