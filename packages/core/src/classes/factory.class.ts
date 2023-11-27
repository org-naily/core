import "reflect-metadata";
import { isClass } from "is-class";
import { Type } from "../typings";
import { NailyRegistry } from "./registry.class";
import { NailyWatermark, Scope } from "../constants";
import sp from "synchronized-promise";

export class NailyFactory<Instance extends Object> {
  constructor(private readonly target: Type<Instance>) {}

  public getOptions<Metadata extends NIOC.Metadata>(): Metadata | undefined {
    return Reflect.getMetadata(NailyWatermark.INJECTABLE, this.target);
  }

  public getOptionsOrthrow<Metadata extends NIOC.Metadata>(): Metadata {
    const options = this.getOptions() as Metadata;
    if (!options) throw new TypeError(`The target ${this.target} is not a injectable class`);
    return options;
  }

  public getParamtypes<T extends any[]>(): T {
    return Reflect.getMetadata("design:paramtypes", this.target) || [];
  }

  public transformParamtypesToParameter() {
    return this.getParamtypes().map((paramtype) => {
      if (!isClass(paramtype)) throw new TypeError(`The paramtype ${paramtype} is not a class`);
      return new NailyFactory(paramtype).createInstance();
    });
  }

  public createInstance(proxy = true): Instance {
    const options = this.getOptionsOrthrow();

    if (options.Scope === Scope.SINGLETON) {
      const RepositoryCache = NailyRegistry.map.get(options.Token);
      if (RepositoryCache) {
        return RepositoryCache.instance as Instance;
      }
    }

    const parameters = this.transformParamtypesToParameter();
    const instance = new this.target(...parameters);

    NailyRegistry.map.set(options.Token, {
      target: this.target,
      instance: instance,
      type: "class",
      configure: {
        isConfigure: instance["getAllConfigure"] && typeof instance["getAllConfigure"] === "function" ? true : false,
        configureValue:
          instance["getAllConfigure"] && typeof instance["getAllConfigure"] === "function" ? sp(instance["getAllConfigure"])() : undefined,
      },
    });

    if (options.Scope === Scope.PROTOTYPE && proxy) {
      return new Proxy(instance, {
        get: (_target, key) => {
          return new NailyFactory(this.target).createInstance(false)[key];
        },
      });
    }
    return instance;
  }
}
