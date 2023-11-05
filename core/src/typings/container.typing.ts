import { NToken, Type } from "./common.typing";

export namespace NContainer {
  export interface ClassElement<Instance> {
    type: "class";
    target: Type<Instance>;
    instance: Instance;
  }
  export type Element = ClassElement<any>;
}
export interface NContainer {
  getMap(): Map<NToken, NContainer.Element>;
  getElementByToken(token: NToken): NContainer.Element | undefined;
  getElementByTokenOrThrow(token: NToken): NContainer.Element;
  hasElement(token: NToken): boolean;
  clear(): void;
}
