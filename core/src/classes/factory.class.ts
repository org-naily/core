import { NailyWatermark, ScopeEnum } from "@/constants";
import { Injectable } from "@/decorators";
import { NConfigure, NIOC, Type } from "@/typings";
import { NailyRepository } from "./repository.class";
import sp from "synchronized-promise";
import JEXL from "jexl";

@Injectable()
export class NailyFactory<Instance extends Partial<NConfigure> | Object> {
  constructor(private readonly target: Type<Instance>) {}

  public getTarget() {
    return this.target;
  }

  public static getJexlBuilder() {
    return JEXL;
  }

  public getInstance(proxy = true): Instance {
    const options = this.getInjectableOptionsOrThrow();
    if (options.Scope === ScopeEnum.Singleton && NailyRepository.has(options.Token)) {
      return NailyRepository.getClassElement(options.Token).instance;
    }

    const parameters = this.transformConstructorParameters();
    const instance = new this.target(...parameters);

    NailyRepository.set(options.Token, {
      type: "class",
      target: this.target,
      instance: instance,
      options: options,
      configure: {
        haveConfigure: (instance as Partial<NConfigure>).getConfigure ? true : false,
        value: (instance as Partial<NConfigure>).getConfigure
          ? (sp((instance as Partial<NConfigure>).getConfigure.bind(instance, JEXL))(JEXL) as any[] | object)
          : undefined,
      },
    });

    if (proxy && options.Scope === ScopeEnum.Prototype) {
      return new Proxy(instance, {
        get: (_target, key) => {
          return new NailyFactory(this.target).getInstance(false)[key];
        },
      });
    } else {
      return instance;
    }
  }

  public getInjectableOptions(): NIOC.InjectableOptions | undefined {
    return Reflect.getMetadata(NailyWatermark.INJECTABLE, this.target);
  }

  public getInjectableOptionsOrThrow(): NIOC.InjectableOptions {
    const options = this.getInjectableOptions();
    if (!options) throw new Error(`The class ${this.target.name} is not an injectable class.`);
    return options;
  }

  public getParamtypes(): any[] {
    return Reflect.getMetadata("design:paramtypes", this.target) || [];
  }

  public getPrototypeKeys(): (string | symbol)[] {
    return Reflect.ownKeys(this.target.prototype).filter((key) => (key === "constructor" ? undefined : key));
  }

  public getStaticKeys(): (string | symbol)[] {
    return Reflect.ownKeys(this.target);
  }

  public transformConstructorParameters(): Object[] {
    const paramtypes = this.getParamtypes();
    return paramtypes.map((paramtype) => {
      return new NailyFactory(paramtype).getInstance();
    });
  }
}
