import { Type } from "./common.typing";

export interface IContainer<T extends object = object> {
  target: Type;
  newed: T;
}

export interface IComponentMetadata extends IContainer {
  metadata: IComponent;
}
