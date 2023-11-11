import { isClass } from "is-class";
import { NailyWatermark, ScopeEnum } from "@/constants";
import { NailyInjectableManager } from "./factory.class";
import { NIoc, NLifeCycle, Type } from "@/typings";
import { Injectable } from "@/decorators";

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
        // 转换为代理后get的时候返回的应该是单例池中的实例
        const newSingleton = new NailyInjectableFactory(this.target).create(false);
        // 创建之后 改变单例池中的元素ClassElement
        NailyInjectableManager.addClassElementOrChange(
          this.getInjectableOptionsOrThrow().token,
          this.target,
          newSingleton,
          this.getInjectableOptionsOrThrow(),
          Reflect.getMetadata(NailyWatermark.CONFIGURATION, this.target) ? true : false
        );
        // 返回
        return newSingleton[propertyKey];
      },
    });
  }

  public create(proxy = true): Instance {
    const metadata = this.getInjectableOptionsOrThrow();
    // !如果为代理 且为单例模式 则检查单例池
    if (!proxy && metadata.scope === ScopeEnum.SINGLETON && NailyInjectableManager.getClassElement(metadata.token)) {
      // !如果单例池中有 则直接返回
      return NailyInjectableManager.getClassElementOrThrow(metadata.token).instance as Instance;
    }

    const argTypes = this.getParameterTypes();
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
    NailyInjectableManager.addClassElementOrChange(
      metadata.token,
      this.target,
      instance,
      metadata,
      Reflect.getMetadata(NailyWatermark.CONFIGURATION, this.target) ? true : false
    );
    return instance;
  }
}
