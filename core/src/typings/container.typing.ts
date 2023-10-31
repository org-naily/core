import { NLifeCycle, Type } from "./common.typing";

export type NToken = string | symbol;
export namespace NFactory {}
export interface NFactory {
  getClassInstance<Instance extends Object>(target: Type<Instance>, container: NContainer): Instance;
}

export namespace NContainer {
  export interface ClassElement<Instance extends NLifeCycle = NLifeCycle> {
    type: "class";
    target: Type<Instance>;
    instance: Instance;
  }
  export interface ConstantElement<Instance extends NLifeCycle = NLifeCycle, Value = any> {
    type: "constant";
    target: Type<Instance>;
    instance: Instance;
    value: Value;
  }
  export interface ConfigureElement<Instance extends NLifeCycle = NLifeCycle, Value = any> {
    type: "configure";
    target: Type<Instance>;
    instance: Instance;
    value: Value;
  }
  export type Element<Instance extends NLifeCycle = NLifeCycle, Value = any> =
    | ClassElement<Instance>
    | ConstantElement<Instance, Value>
    | ConfigureElement<Instance, Value>;
}
export interface NContainer {
  addClass<Instance extends NLifeCycle>(target: Type<Instance>, token?: NToken): NContainer.ClassElement<Instance>;
  getClassOrThrow<Instance extends NLifeCycle>(token: NToken): NContainer.ClassElement<Instance>;
  getAll(): NContainer.Element[];
  getMap(): Map<NToken, NContainer.Element>;
  getElementByTargetOrThrow<Instance extends NLifeCycle>(target: Type<Instance>): NContainer.Element;
  changeClassInstance<Instance extends NLifeCycle>(token: NToken, instance: Instance): void;
  has(token: NToken): boolean;
  remove(token: NToken): void;
  clear(): void;
}
