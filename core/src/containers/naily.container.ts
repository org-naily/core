import { NailyIOCWatermark } from "../constants/watermark.constant";
import { Scope, Type } from "../typings/common.typing";
import { NContainer } from "../typings/container.typing";
import { NailyBaseFactory } from "./base.container";
import { isClass } from "is-class";

class NailyFactory<T extends any = any> extends NailyBaseFactory<T> implements NContainer<T> {
  private transformInjectClass(injectValue: Type, target: Type, instance: T, key: string | symbol) {
    const injectToken: string = Reflect.getMetadata(NailyIOCWatermark.INJECTABLE, injectValue);
    if (!injectToken) throw new TypeError(`${target.name}'s${injectValue.name} is no a injectable.`);
    const injectInstance = this.getClassOneByTokenOrThrow(injectToken);

    if (injectInstance.scope === Scope.Singleton) {
      instance[key] = injectInstance;
    } else if (injectInstance.scope === Scope.Transient) {
      instance[key] = this.transformInstanceToProxy(injectInstance as object, injectValue);
    } else {
      throw new Error(`The ${injectValue.name}'s scope is undefined`);
    }
  }

  private getInstance(target: Type) {
    const instance = new target(...this.transformParamtypeToParam(target));
    const injectOwnKeys = this.getOwnKeys(target);

    for (let i = 0; i < injectOwnKeys.length; i++) {
      const key = injectOwnKeys[i];
      const injectValue: Type | string = Reflect.getMetadata(NailyIOCWatermark.INJECT, target.prototype, key);
      if (!injectValue) continue;

      switch (typeof injectValue) {
        case "function":
          this.transformInjectClass(injectValue, target, instance, key);
          break;
        case "string":
          const tokenInstance = this.getOneByTokenOrThrow(injectValue as string);
          if (tokenInstance.type === "class") {
            this.transformInjectClass(tokenInstance.target, target, instance, key);
          } else if (tokenInstance.type === "constant") {
            instance[key] = tokenInstance.value;
          } else {
            throw new Error(`@Inject only can be inject class or constant, config's value please use @Value`);
          }
          break;
        default:
          throw new Error(`@Inject's param must be string or class`);
      }
    }

    return instance;
  }

  private getOwnKeys(target: Type) {
    return Reflect.ownKeys(target.prototype).filter((key) => (key === "constructor" ? undefined : key));
  }

  private transformInstanceToProxy(instance: Object, target: Type): T {
    return new Proxy(instance, {
      get: (proxyTarget, prop) => {
        console.log(`${target.name} is executed in ${instance.constructor.name}'s ${String(prop)} property`);
        return this.getInstance(target)[prop];
      },
    }) as T;
  }

  private transformParamtypeToParam(target: Type): T[] {
    const paramtype: Type[] = Reflect.getMetadata("design:paramtypes", target) || [];

    return paramtype.map((typing, index) => {
      if (!isClass(typing)) throw new TypeError(`${target.name}'s constructor index [${index}] is not a class`);
      const token: string = Reflect.getMetadata(NailyIOCWatermark.INJECTABLE, typing);
      if (!token) throw new Error(`Class "${typing.name}" is not injectable`);
      const instance = this.getOneByTokenOrThrow(token);
      if (instance.type !== "class") throw new TypeError(`${target.name}'s constructor index [${index}] is not a class`);

      switch (instance.scope) {
        case Scope.Singleton:
          return instance.instance;
        case Scope.Transient:
          return this.transformInstanceToProxy(instance.instance, typing);
        default:
          throw new Error(`${target.name}'s Scope is undefined`);
      }
    });
  }

  public insertClass(target: Type<T>): NContainer.ClassElement<T> {
    const token: string = Reflect.getMetadata(NailyIOCWatermark.INJECTABLE, target);
    if (!token) throw new Error(`Class "${target.name}" is not injectable`);
    const scope: Scope = Reflect.getMetadata(NailyIOCWatermark.SCOPE, target);
    let classElement: NContainer.ClassElement<T> = {
      type: "class",
      scope: scope,
      instance: this.getInstance(target),
      target: target,
    };
    this.container.set(token, classElement);
    return this.container.get(token) as NContainer.ClassElement;
  }
}

export const NailyFactoryContext = new NailyFactory();
