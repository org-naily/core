import { INailyContainerImpl, NailyIOCWatermark, Type } from "..";
import { NailyContainer } from "./abstract.container";
import { isClass } from "is-class";

export class NailyAbstractInjectableContainer extends NailyContainer implements INailyContainerImpl {
  add<T>(target: Type<Object>): void | T {
    const token = Reflect.getMetadata(NailyIOCWatermark.INJECTABLE, target);
    const params = this.parseParameter(target);
    const injectProperties = this.parseInject(target);
    const instance = new target(...params);
    for (const item in injectProperties) {
      instance[item] = injectProperties[item];
    }
    this.container.set(token, { target, instance });
  }

  private parseParameter(target: Type): Object[] {
    const params: Type[] = Reflect.getMetadata("design:paramtypes", target) || [];
    return params.map((param) => {
      if (!isClass(param)) throw new TypeError(`Expected a class, but got ${typeof param}. Please check ${target.name}`);
      const childrenToken: string = Reflect.getMetadata(NailyIOCWatermark.INJECTABLE, param);
      if (!childrenToken) throw new Error(`Missing @Injectable() decorator on ${param.name}`);
      const children = this.get(childrenToken);
      if (!children) throw new Error(`Missing @Injectable() decorator on ${param.name}.`);
      return children.instance;
    });
  }

  private parseInject(target: Type) {
    const ownKeys = this.getOwnKeys(target);

    const prototype: Object = {};
    for (let i = 0; i < ownKeys.length; i++) {
      const inject = Reflect.getMetadata(NailyIOCWatermark.INJECT, target.prototype, ownKeys[i]);
      if (typeof inject !== "function" || !isClass(inject)) continue;
      const children: string = Reflect.getMetadata(NailyIOCWatermark.INJECTABLE, inject);
      if (!children) throw new Error(`Missing @Injectable() decorator on ${inject.name}.`);
      const childrenInstance = this.get(children);
      if (!childrenInstance) throw new Error(`Missing @Injectable() decorator on ${inject.name}.`);
      prototype[ownKeys[i]] = childrenInstance.instance;
    }
    return prototype;
  }
}
