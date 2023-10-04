export interface Type<T = any, P = any> extends Function {
  new (...args: P[]): T;
}

export interface RxType<T = any> extends Function {
  new (): T;
}

export interface ObType<T = any> extends Function {
  new (...args: object[]): T;
}
