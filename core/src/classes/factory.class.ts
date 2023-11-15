import "reflect-metadata";
import { isClass } from "is-class";
import { Injectable } from "@/decorators";
import { Type, NAction, NIOC, NToken } from "@/typings";
import { NailyRepository } from "@/classes";
import { ScopeEnum, NailyWatermark } from "@/constants";

@Injectable()
export class NailyFactory<Instance extends Object> {
  constructor(private readonly target: Type<Instance>) {}

  public getTarget(): Type<Instance> {
    return this.target;
  }

  public getInjectableOptions(): NIOC.InjectableOptions | undefined {
    return Reflect.getMetadata(NailyWatermark.INJECTABLE, this.target);
  }

  public getInjectableOptionsOrThrow(): NIOC.InjectableOptions {
    const injectableOptions = this.getInjectableOptions();
    if (!injectableOptions) {
      throw new Error(`The class ${this.target.name} is not a injectable class.`);
    } else if (!injectableOptions.token) {
      throw new Error(`The class ${this.target.name} is not a injectable class, because it has no token.`);
    } else if (!injectableOptions.scope) {
      throw new Error(`The class ${this.target.name} is not a injectable class, because it has no scope.`);
    } else return injectableOptions;
  }

  public getInjectableToken(): NToken | undefined {
    const injectableOptions = this.getInjectableOptions();
    return injectableOptions?.token;
  }

  public getInjectableTokenOrThrow(): NToken {
    const injectableOptions = this.getInjectableOptionsOrThrow();
    if (!injectableOptions.token) {
      throw new Error(`The class ${this.target.name} is not a injectable class, because it has no token.`);
    }
    return injectableOptions.token;
  }

  public getInjectableScope(): ScopeEnum | undefined {
    const injectableOptions = this.getInjectableOptions();
    return injectableOptions?.scope;
  }

  public getInjectableScopeOrThrow(): ScopeEnum {
    const injectableOptions = this.getInjectableOptionsOrThrow();
    if (!injectableOptions.scope) {
      throw new Error(`The class ${this.target.name} is not a injectable class, because it has no scope.`);
    }
    return injectableOptions.scope;
  }

  public getInjectableActions(): NAction[] {
    return Reflect.getMetadata(NailyWatermark.ACTION, this.target) || [];
  }

  public getPrototypeKeys(): (string | symbol)[] {
    return Reflect.ownKeys(this.target.prototype).filter((key) => (key === "constructor" ? undefined : key));
  }

  public getStaticKeys(): (string | symbol)[] {
    return Reflect.ownKeys(this.target);
  }

  public getParamtypes(): any[] {
    return Reflect.getMetadata("design:paramtypes", this.target) || [];
  }

  public getParamtypesOrThrow(): Type[] {
    return this.getParamtypes().map((val, i) => {
      if (!isClass(val)) throw new TypeError(`The class ${this.target.name}'s ${val.name} (constructor param index [${i}]) is not a class.`);
      return val;
    });
  }

  public transformParamtypes(): Type[] {
    return this.getParamtypesOrThrow().map((val) => new NailyFactory(val).create());
  }

  public getClassMetadata<Value>(key: any): Value {
    return Reflect.getMetadata(key, this.target);
  }

  public getClassMetadataOrThrow<Value>(key: any): Value {
    const value = this.getClassMetadata<Value>(key);
    if (!value) throw new Error(`The class ${this.target.name} has no ${key.toString()}.`);
    return value;
  }

  public getPrototypeMetadata<Value, Key = any>(key: Key, property: string | symbol): Value {
    return Reflect.getMetadata(key, this.target.prototype, property);
  }

  public getPrototypeMetadataOrThrow<Value, Key = any>(key: Key, property: string | symbol): Value {
    const value = this.getPrototypeMetadata<Value>(key, property);
    if (!value) throw new Error(`The class ${this.target.name}'s property ${property.toString()} has no ${key.toString()}.`);
    return value;
  }

  public getStaticMetadata<Value, Key = any>(key: Key, property: string | symbol): Value {
    return Reflect.getMetadata(key, this.target, property);
  }

  public getStaticMetadataOrThrow<Value, Key = any>(key: Key, property: string | symbol): Value {
    const value = this.getStaticMetadata<Value>(key, property);
    if (!value) throw new Error(`The class ${this.target.name}'s static property ${property.toString()} has no ${key.toString()}.`);
    return value;
  }

  public setClassMetadata<Value>(key: any, value: Value): this {
    Reflect.defineMetadata(key, value, this.target);
    return this;
  }

  public setPrototypeMetadata<Value, Key = any>(key: Key, value: Value, property: string | symbol): this {
    Reflect.defineMetadata(key, value, this.target.prototype, property);
    return this;
  }

  public setStaticMetadata<Value, Key = any>(key: Key, value: Value, property: string | symbol): this {
    Reflect.defineMetadata(key, value, this.target, property);
    return this;
  }

  private createInstance(proxy = true, instance?: Object) {
    const injectableOptions = new NailyFactory(this.target).getInjectableOptionsOrThrow();
    const parameters = new NailyFactory(this.target).transformParamtypes();

    if (injectableOptions.scope === ScopeEnum.PROTOTYPE && proxy === true) {
      return new Proxy(instance ? instance : new this.target(...parameters), {
        get: (_target, p) => {
          return new NailyFactory(this.target).create(false)[p];
        },
      });
    } else {
      return new this.target(...parameters);
    }
  }

  public create(proxy = true, addFactory = true): Instance {
    const injectableOptions = this.getInjectableOptionsOrThrow();
    let parameters = this.transformParamtypes();
    const actions = this.getInjectableActions();

    for (const action of actions) {
      if (action.beforeExecute) {
        action.beforeExecute(this, {
          setParameters: (newParameters: any[]) => (parameters = newParameters),
        });
      }
    }

    let instance = this.createInstance(proxy);

    for (const action of actions) {
      if (action.afterExecute) {
        action.afterExecute(this, {
          getInstance: <T>() => instance as unknown as T,
          setInstance: <T extends Object>(newInstance: T) => {
            instance = this.createInstance(proxy, newInstance);
          },
        });
      }
    }

    if (addFactory) {
      NailyRepository.set({
        type: "class",
        target: this.target,
        instance: instance,
        options: injectableOptions,
      });
    }
    return instance as Instance;
  }
}
