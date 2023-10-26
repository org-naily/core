export interface Type<T extends Object = Object> extends Function {
  new (...args: any[]): T;
}
