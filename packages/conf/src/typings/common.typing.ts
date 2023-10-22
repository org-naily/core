export interface NailyStaticConfiguration {
  get<T>(): T;
}
export interface NailyConfigration extends NailyStaticConfiguration {
  set<T>(val: T): T;
}
