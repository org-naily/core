import { ScopeEnum } from "../constants";
import { Type } from "./common.typing";
import JEXL from "jexl";

export type NToken = string | symbol;

export interface NConfigure {
  getConfigure(builder: typeof JEXL): Promise<any>;
}

export namespace NIOC {
  export interface InjectableOptions {
    Token: NToken;
    Scope: ScopeEnum;
  }
  export interface ClassElement<T = any> {
    type: "class";
    target: Type<T>;
    instance: T;
    options: InjectableOptions;
    configure: {
      haveConfigure: boolean;
      value: any[] | object | undefined | null;
    };
  }
  export interface ConstantElement<T = any> {
    type: "constant";
    target: Type<T>;
    instance: T;
    value: any;
  }
  export type Element = ClassElement | ConstantElement;
}
