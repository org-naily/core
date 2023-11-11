import { isClass } from "is-class";
import { Injectable, NIoc, NLifeCycle, NailyWatermark, Type, ScopeEnum } from "..";
import { NailyInjectableManager } from "./factory.class";

@Injectable()
export class NailyInjectableFactory<Instance extends NLifeCycle = NLifeCycle> {
  constructor(private target: Type<Instance>) {}

  public getInjectableOptions(): NIoc.InjectableOptions | undefined {
    return Reflect.getMetadata(NailyWatermark.INJECTABLE, this.target);
  }

  public getInjectableOptionsOrThrow(msg?: string): NIoc.InjectableOptions {
    const options = this.getInjectableOptions();
    if (!options) throw new TypeError(msg ? msg : `${this.target.name} is no a injectable class.`);
    return options;
  }

  public getParameterTypes(): any[] {
    return Reflect.getMetadata("design:paramtypes", this.target) || [];
  }

  public getParameterTypesOrThrow(msg?: (param: any, target: Type) => string): Type[] {
    const types = this.getParameterTypes();
    types.forEach((item) => {
      if (!isClass(item)) throw new TypeError(msg ? msg(item, this.target) : `${this.target}'s constructor param ${item} is not a class.`);
      const options = new NailyInjectableFactory(item).getInjectableOptions();
      if (!options) throw new TypeError(`${this.target}'s constructor param ${item} is not a injectable class.`);
    });
    return types;
  }

  public getPrototypeOwnkeys(): (string | symbol)[] {
    return Reflect.ownKeys(this.target.prototype).filter((key) => (key !== "constructor" ? key : undefined));
  }

  public getStaticOwnkeys(): (string | symbol)[] {
    return Reflect.ownKeys(this.target);
  }

  public parseParameterTypeToConstructorOrThrow() {
    return this.getParameterTypesOrThrow().map((item) => new NailyInjectableFactory(item).create());
  }

  public transformInstanceToProxy(instance: Instance): Instance {
    return new Proxy(instance, {
      get: (_inTarget, propertyKey) => {
        return new NailyInjectableFactory(this.target).create(false)[propertyKey];
      },
    });
  }

  public create(proxy = true): Instance {
    const argTypes = this.getParameterTypes();
    const metadata = this.getInjectableOptionsOrThrow();
    const args = this.parseParameterTypeToConstructorOrThrow();
    if (this.target.nailyBeforeInit) {
      this.target.nailyBeforeInit({
        getArgs: () => args,
        getArgTypes: () => argTypes,
        getMetadata: () => metadata,
        getInstance: () => instance,
        getTarget: <Instance>() => this.target as Instance,
        setInstance: (newInstance) => (instance = newInstance as Instance),
        setTarget: (newTarget) => (this.target = newTarget),
      });
    }
    let instance = new this.target(...args);
    if (instance.nailyInit) {
      instance.nailyInit({
        getArgs: () => args,
        getArgTypes: () => argTypes,
        getMetadata: () => metadata,
        getInstance: () => instance,
        getTarget: <Instance>() => this.target as Instance,
        setInstance: (newInstance) => (instance = newInstance as Instance),
      });
    }

    if (proxy && metadata.scope === ScopeEnum.PROTOTYPE) instance = this.transformInstanceToProxy(instance);
    NailyInjectableManager.addClassElementOrChange(metadata.token, this.target, instance);
    return instance;
  }
}
