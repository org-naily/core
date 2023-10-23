export interface NailyStaticConfiguration {
  get<T>(jexl: string): T | Promise<T>;
}
export interface NailyConfigration extends NailyStaticConfiguration {
  set<T>(val: T): T;
}
