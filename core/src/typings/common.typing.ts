import { IScopeOption, ScopeOption } from "../constants";

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
export type NToken = string | symbol;
export namespace NAction {
  export interface Ctx {
    getMetadata(): NInjectableOptions;
    getParamtypes(): Type[];
    getPrototypekeys(): (string | symbol)[];
    getStaticKeys(): (string | symbol)[];
    getTarget(): Type;
  }
  export interface BeforeCtx extends Ctx {
    setTarget(newTarget: Type): void;
  }
  export interface AfterCtx extends Ctx {
    getInstance(): Object;
    setInstance(newInstance: Object): void;
  }
}
export interface NAction {
  whenBeforeCreate(ctx: NAction.BeforeCtx): void;
  whenCreated(ctx: NAction.AfterCtx): void;
}
export interface NInjectableOptions {
  token?: NToken;
  scope?: IScopeOption;
  actions?: Type<NAction>[];
}
export namespace NAdvice {
  export interface Ctx {
    getArgs(): any[];
    getPropertyKey(): string | symbol;
  }
  export interface BeforeCtx extends Ctx {}
  export interface AfterCtx extends Ctx {
    getReturnValue(): any;
  }
}
export interface NAdvice {
  whenBefore(ctx: NAdvice.BeforeCtx): void;
  whenAfter(ctx: NAdvice.AfterCtx): void;
}
