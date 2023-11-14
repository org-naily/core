import { ScopeEnum } from "@/constants";

export type NToken = string | symbol;
export namespace NIOC {
  export interface InjectableOptions {
    token: NToken;
    scope: ScopeEnum;
  }
}
