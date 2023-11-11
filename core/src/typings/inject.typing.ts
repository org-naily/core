import { ScopeEnum } from "..";

export type NToken = string | symbol;
export namespace NIoc {
  export interface InjectableOptions {
    scope?: ScopeEnum;
    token?: NToken;
  }
}
export interface NConfigure {
  getConfigure(jexl: string): any;
}