export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
export interface RxType<T = any> extends Function {
  new (): T;
}
