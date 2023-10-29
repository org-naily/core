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

export interface NContainer<T> {
  getMap(): Map<string, NContainer.Element<T>>;
  getAll(filter?: NContainer.Filter): NContainer.Element<T>[];
  getOneByToken(token: string): NContainer.Element<T> | undefined;
  getOneByTokenOrThrow(token: string): NContainer.Element<T>;
  insertClass(target: Type<T>): NContainer.ClassElement<T>;
  insertConstant(token: string, value: T): NContainer.ConstantElement<T>;
  insertConfig(token: string, value: T): NContainer.ConfigElement<T>;
}
