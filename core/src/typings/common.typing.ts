import { Scope } from "../constants";

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
export interface RxType<T = any> extends Function {
  new (): T;
}
export type NToken = string | symbol;
export interface InjectableOptions {
  token?: NToken;
  scope?: Scope;
}
export interface NLifeCycle extends Object {
  onInit?(): void | Promise<void>;
}
export namespace NAction {
  export interface CommonHost {
    getToken(): string | symbol;
    getTarget(): Type<NLifeCycle>;
    getScope(): Scope;
    getParamTypes(): Type<NLifeCycle>[];
    getActions(): RxType<NAction>[];
    getParams(): NLifeCycle[];
    getPrototypeOwnKeys(): (string | symbol)[];
    getStaticOwnKeys(): (string | symbol)[];
  }

  export interface BeforeInitHost extends CommonHost {
    setParams(newParams: NLifeCycle[]): void;
    setTarget(newTarget: Type<NLifeCycle>): void;
  }
  export interface AfterInitHost extends CommonHost {
    getInstance(): NLifeCycle;
    setInstance(newInstance: NLifeCycle): void;
  }
}
export interface NAction extends Object {
  beforeInit?(injectableHost: NAction.BeforeInitHost): void;
  afterInit?(injectableHost: NAction.AfterInitHost): void;
}
