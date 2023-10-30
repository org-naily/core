import { Scope, Type } from "./common.typing";

export namespace NContainer {
  export interface ClassElement<T = any> {
    type: "class";
    scope: Scope;
    target: Type<T>;
    instance: T;
  }
  export interface ConstantElement<T extends any = any> {
    type: "constant";
    value: T;
  }
  export interface ConfigElement<T extends any = any> {
    type: "config";
    value: T;
  }
  export type ElementType = "class" | "constant" | "config";
  export type Element<T extends any = any> = ClassElement<T> | ConstantElement<T> | ConfigElement<T>;
  export interface Filter {
    type?: ElementType[];
  }
}

export interface NContainer {
  /**
   * Get raw Map
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/30
   * @return {Map<string, NContainer.Element<T>>}
   * @memberof NContainer
   */
  getMap<R>(): Map<string, NContainer.Element<R>>;
  /**
   * Get array elements & filters
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/30
   * @param {NContainer.Filter} [filter]
   * @return {NContainer.Element<T>[]}
   * @memberof NContainer
   */
  getAll<R>(filter?: NContainer.Filter): NContainer.Element<R>[];
  /**
   * Transform class to a new transient Instance
   *
   * ! [TODO) Performance: will create a new class to instance, pay attention to use.
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/30
   * @template R
   * @param {Type<R>} target
   * @return {R}
   * @memberof NContainer
   */
  getTransientInstance<R extends Object>(target: Type<R>): R;
  /**
   * Get single element by token
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/30
   * @template R
   * @param {string} token
   * @return {(NContainer.Element<R> | undefined)}
   * @memberof NContainer
   */
  getOneByToken<R extends any = any>(token: string): NContainer.Element<R> | undefined;
  /**
   * Get single element by token, if undefined, throw an error.
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/30
   * @template R
   * @param {string} token
   * @return {NContainer.Element<R>}
   * @memberof NContainer
   */
  getOneByTokenOrThrow<R extends any = any>(token: string): NContainer.Element<R>;
  /**
   * Get single class element by token, if undefined or no a class element will throw an error.
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/30
   * @template R
   * @param {string} token
   * @return {NContainer.ClassElement<R>}
   * @memberof NContainer
   */
  getClassOneByTokenOrThrow<R extends Object = Object>(token: string): NContainer.ClassElement<R>;
  /**
   * Insert a new class by `Reflect.defineMetadata`
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/30
   * @param {Type<T>} target
   * @return {NContainer.ClassElement<T>}
   * @memberof NContainer
   */
  insertClass<R extends Object>(target: Type<R>): NContainer.ClassElement<R>;
  /**
   * Insert a new class
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/30
   * @template R
   * @param {Type<R>} target
   * @param {string} [token]
   * @param {Scope} [scope]
   * @return {NContainer.ClassElement<R>}
   * @memberof NContainer
   */
  insertRawClass<R extends Object>(target: Type<R>, token?: string, scope?: Scope): NContainer.ClassElement<R>;
  /**
   * Insert a new constant by `Reflect.defineMetadata`
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/30
   * @param {string} token
   * @param {T} value
   * @return {NContainer.ConstantElement<T>}
   * @memberof NContainer
   */
  insertConstant<R extends any>(token: string, value: R): NContainer.ConstantElement<R>;
  /**
   * Insert a new config by `Reflect.defineMetadata`
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/30
   * @param {string} token
   * @param {T} value
   * @return {NContainer.ConfigElement<T>}
   * @memberof NContainer
   */
  insertConfig<R extends any>(token: string, value: R): NContainer.ConfigElement<R>;
}
