import { Type } from "./common.typing";

export namespace NContainer {
  export interface ClassElement<Instance> {
    type: "class";
    target: Type<Instance>;
    instance: Instance;
  }
  export type Element = ClassElement<any>;
}
export interface NContainer {}
