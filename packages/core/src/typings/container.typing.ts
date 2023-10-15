import { Type } from "./common.typing";

export interface INailyContainer<T = Record<string | symbol, any>> {
  target: Type<T>;
  newed: T;
}
