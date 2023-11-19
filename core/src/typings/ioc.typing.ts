import { ScopeEnum } from "../constants";
import { Type } from "./common.typing";
import JEXL from "jexl";

export type NToken = string | symbol;

export interface NConfigure {
  getConfigure(builder: typeof JEXL): Promise<any>;
}

declare global {
  export namespace NIOC {
    export interface InjectableOptions {
      Token: NToken;
      Scope: ScopeEnum;
    }
    export interface ComponentRawOptions {
      Imports: Type[];
      Providers: Type[];
      Exports: Type[];
    }
    export interface ComponentOptions extends NIOC.InjectableOptions {}
    export interface ComponentOptions extends ComponentRawOptions {}
    export interface BaseFactoryOptions {
      EnableComponent: boolean;
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
}
