export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
export type NToken = string | symbol;
export interface InjectableOptions {
  token?: NToken;
}
