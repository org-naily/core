import { NailyIOCWatermark } from "../constants/watermark.constant";
import { Scope, Type } from "../typings/common.typing";
import { NContainer } from "../typings/container.typing";
import { generateToken } from "../utils/generateToken";
import { Logger } from "../vendors";
import { NailyBaseFactory } from "./base.container";
import { isClass } from "is-class";

class NailyFactory extends NailyBaseFactory implements NContainer {
  private transformInjectClass<R>(injectValue: Type<R>, target: Type<R>, instance: R, key: string | symbol) {
    const injectToken: string = Reflect.getMetadata(NailyIOCWatermark.INJECTABLE, injectValue);
    if (!injectToken) throw new TypeError(`${target.name}'s${injectValue.name} is no a injectable.`);
    const injectInstance = this.getClassOneByTokenOrThrow(injectToken);

    if (injectInstance.scope === Scope.Singleton) {
      instance[key] = injectInstance.instance;
    } else if (injectInstance.scope === Scope.Transient) {
      instance[key] = this.transformInstanceToProxy(injectInstance as object, injectValue);
    } else {
      throw new Error(`The ${injectValue.name}'s scope is undefined`);
    }
  }

  public getTransientInstance<R>(target: Type<R>): R {
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

  private transformInstanceToProxy<R>(instance: Object, target: Type<R>): R {
    return new Proxy(instance, {
      get: (_proxyTarget, prop) => {
        new Logger().debug(`${target.name}'s ${String(prop)} is be called`);
        return this.getTransientInstance(target)[prop];
      },
    }) as R;
  }

  private transformParamtypeToParam<R>(target: Type): R[] {
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

  public insertClass<R extends Object>(target: Type<R>): NContainer.ClassElement<R> {
    const token: string = Reflect.getMetadata(NailyIOCWatermark.INJECTABLE, target);
    if (!token) throw new Error(`Class "${target.name}" is not injectable`);
    const scope: Scope = Reflect.getMetadata(NailyIOCWatermark.SCOPE, target);
    if (!scope) throw new Error(`Class "${target.name}"'s scope is undefined`);
    return this.insertRawClass(target, token, scope);
  }
}

export const NailyFactoryContext = new NailyFactory();
