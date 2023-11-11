import { Type } from "./common.typing";
import { NIoc } from "./inject.typing";

export interface NContainer {}
export namespace NContainer {
  export interface ClassElement<Instance = Object> {
    type: "class";
    target: Type;
    instance: Instance;
    options: NIoc.InjectableOptions;
  }
  export type Element = ClassElement;
}
