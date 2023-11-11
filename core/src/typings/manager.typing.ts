import { Type } from "./common.typing";

export interface NContainer {}
export namespace NContainer {
  export interface ClassElement {
    type: "class";
    target: Type;
    instance: Object;
  }
  export type Element = ClassElement;
}
