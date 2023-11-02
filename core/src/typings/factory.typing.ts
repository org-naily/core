import { NLifeCycle, NToken, Type } from "./common.typing";

export namespace NFactory {
  export interface ClassElement<T = NLifeCycle> {
    type: "class";
    target: Type<T>;
    instance: T;
  }
  export interface ConstantElement<T = NLifeCycle> {
    type: "constant";
    target: Type<T>;
    instance: T;
    value: Array<any> | object;
  }
  export type Element<T = NLifeCycle> = ClassElement<T>;
}
export interface NFactory {
  addClass<T extends NLifeCycle = NLifeCycle>(token: NToken, target: Type<T>, instance: T): NFactory.ClassElement<T>;
  getClassByToken<T = NLifeCycle>(token: NToken): NFactory.ClassElement<T>;
  getClassByTarget<T = NLifeCycle>(target: Type<NLifeCycle>): NFactory.ClassElement<T>;
  getMap(): Map<NToken, NFactory.Element>;
}
