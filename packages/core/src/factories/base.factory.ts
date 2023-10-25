import { NailyFactoryConstant } from "../constants/watermark.constant";
import { Type } from "../typings/common.typing";
import { isClass } from "is-class";
import { INailyFactory } from "../typings/factory.typing";

interface INailyFactoryFilterOptions {
  filterKey?: string[];
  filterClassName?: string[];
}

export abstract class NailyBaseFactory implements INailyFactory.INailyFactoryImpl {
  protected readonly container = new Map<string, INailyFactory.INailyFactoryInstance>();

  public static getOwnKey(target: Type | object) {
    return Reflect.ownKeys(typeof target === "function" ? target.prototype : target).filter((item) => (item === "constructor" ? false : item));
  }

  public add(target: Type, key?: string) {}

  public get(key: string): INailyFactory.INailyFactoryInstance {
    return this.container.get(key);
  }

  public all() {
    return this.container;
  }

  public filter(options: INailyFactoryFilterOptions): typeof this.container {
    if (!options.filterKey) options.filterKey = [];
    if (!options.filterClassName) options.filterClassName = [];

    const newMap = new Map<string, INailyFactory.INailyFactoryInstance>();

    for (const i in this.container.values()) {
      const now = this.container.get(i);

      options.filterKey.forEach((item) => {
        if (i === item) {
          newMap.set(item, this.container.get(item));
        }
      });

      options.filterClassName.forEach((item) => {
        if (now.target.name === item) {
          newMap.set(item, this.container.get(item));
        }
      });
    }

    return newMap;
  }

  public has(key: string): boolean {
    return this.container.get(key) ? true : false;
  }

  public remove(key: string): void {
    this.container.delete(key);
  }

  public clear(): void {
    this.container.clear();
  }

  /**
   * ## Transform the constructor parameters to instance
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/25
   * @protected
   * @param {Type} target The class to be parsed.
   * @memberof NailyFactory
   */
  protected transformConstructorParameterToInstance(target: Type) {
    const constructorParameter: Type[] = Reflect.getMetadata("design:paramtypes", target) || [];
    const parsedParams: object[] = [];
    for (let i = 0; i < constructorParameter.length; i++) {
      parsedParams[i] = this.transformInjectableToInstance(constructorParameter[i]);
    }
    return parsedParams;
  }

  /**
   * ## Transform the inject property to instance
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/25
   * @protected
   * @param {Type} target
   * @param {Object} instance
   * @memberof NailyBaseFactory
   */
  protected transformInjectPropertyToInstance(target: Type, instance: Object) {
    const injectPropertyKey = NailyBaseFactory.getOwnKey(target);
    for (let i = 0; i < injectPropertyKey.length; i++) {
      const metadata: Type = Reflect.getMetadata(NailyFactoryConstant.INJECT, target.prototype, injectPropertyKey[i]);
      if (!metadata) continue;
      instance[injectPropertyKey[i]] = this.transformInjectableToInstance(metadata);
    }
  }

  /**
   * ## Add the injectable to the factory when the `add` method is called
   *
   * ---
   *
   * @example Please call it in the `add` method of the subclass like this:
   * ```ts
   * class XXFactory extends NailyBaseFactory {
   *   public add(target: Type, key?: string): INailyFactory.INailyFactoryInstance {
   *     key = super.addBase(target, key);
   *     // ...
   *   }
   * }
   * ```
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/25
   * @protected
   * @param {Type} target
   * @param {string} [key]
   * @return {*}  {string}
   * @memberof NailyBaseFactory
   */
  protected addBase(target: Type, key?: string): string {
    if (!key) {
      const nailyMetadataKey: string | undefined = Reflect.getMetadata(NailyFactoryConstant.INJECTABLE, target);
      if (!nailyMetadataKey) {
        throw new Error(`The key of the injectable is not specified. Please use Naily Injectable decorator to specify the key of the injectable.`);
      }
      key = nailyMetadataKey;
    }
    return key;
  }

  /**
   * ## Transform the injectable in context to instance
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/25
   * @protected
   * @template T
   * @param {Type<T>} target The class to be transformed. This class must be already added to the naily factory.
   * @return {T}
   * @memberof NailyBaseFactory
   */
  private transformInjectableToInstance<T>(target: Type<T>): T {
    if (!isClass(target)) throw new TypeError(`${target} is not a class.`);
    const childrenInjectableKey: string = Reflect.getMetadata(NailyFactoryConstant.INJECTABLE, target);
    if (!childrenInjectableKey) {
      throw new Error(`${target.name} is not a injectable. Please check the ${target.name} class.`);
    }
    const childrenInjectableInstance = this.get(childrenInjectableKey);
    if (!childrenInjectableInstance) throw new Error(`The injectable ${childrenInjectableKey} is not found in naily factory.`);
    return childrenInjectableInstance.instance;
  }
}
