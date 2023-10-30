export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
export interface RxType<T = any> extends Function {
  new (): T;
}
export const enum Scope {
  Singleton = "__singleton__",
  Transient = "__transient__",
}
export interface NInjectableOptions {
  token?: string;
  scope?: Scope;
}
