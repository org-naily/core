export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
export interface RxType<T = any> extends Function {
  new (): T;
}
export interface INailyApplicationOptions {
  entry: string;
  scan: string;
  rootDir: string;
  exclude: string[];
}
export interface INailyContainerItem<T extends object = object> {
  target: Type<T> | RxType<T>;
  instance: T;
}
export interface INailyContainerImpl {
  add?<T>(target: Type): T | void;
  get?(key: string): INailyContainerItem;
  delete(key: string): boolean;
  getOwnKeys?<T>(target: Type<T>): (string | symbol)[];
}
export interface INailyCoreConfigurationImpl {
  beforeNew(target: Type): void;
  afterNew(target: Type, instance: object): void;
}
