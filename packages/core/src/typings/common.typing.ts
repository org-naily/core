export interface ExType<T = any> extends Function {
  new (): T;
}

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
