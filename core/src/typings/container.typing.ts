import { Type } from "./common.typing";

export namespace NFactory {}
export interface NFactory {
  getInstance<Instance extends Object>(target: Type<Instance>): Instance;
}

export namespace NContainer {
  export interface ClassElement<Instance extends Object = Object> {
    type: "class";
    target: Type<Instance>;
    instance: Instance;
  }
  export interface ConstantElement<Instance extends Object = Object, Value = any> {
    type: "constant";
    target: Type<Instance>;
    instance: Instance;
    value: Value;
  }
  export interface ConfigureElement<Instance extends Object = Object, Value = any> {
    type: "configure";
    target: Type<Instance>;
    instance: Instance;
    value: Value;
  }
  export type Element<Instance extends Object = Object, Value = any> =
    | ClassElement<Instance>
    | ConstantElement<Instance, Value>
    | ConfigureElement<Instance, Value>;
}
export interface NContainer {
  add<Instance extends Object, Value>(target: Type<Instance>, token?: string | symbol): NContainer.Element<Instance, Value>;
  get<Instance extends Object, Value = any>(token: string | symbol): NContainer.Element<Instance, Value>;
  getElementByTargetOrThrow<Instance>(target: Type<Instance>): NContainer.Element;
  has(token: string | symbol): boolean;
  remove(token: string | symbol): void;
  clear(): void;
}
