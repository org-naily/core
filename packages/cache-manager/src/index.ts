import { Autowired, Service } from "@org-naily/core";
import { CacheManagerConfiguration } from "./cache.configuration";
import { Cache, Milliseconds, Store, WrapTTL } from "cache-manager";

@Service
export class CacheService implements Cache {
  @Autowired
  private readonly cacheManagerConfiguration: CacheManagerConfiguration;

  public get store(): Store {
    return this.cacheManagerConfiguration.cache.store;
  }

  public set(key: string, value: unknown, ttl?: Milliseconds) {
    return this.cacheManagerConfiguration.cache.set(key, value, ttl);
  }

  public get<T>(key: string): Promise<T | undefined> {
    return this.cacheManagerConfiguration.cache.get(key);
  }

  public del(key: string) {
    return this.cacheManagerConfiguration.cache.del(key);
  }

  public reset() {
    return this.cacheManagerConfiguration.cache.reset();
  }

  public wrap<T>(key: string, fn: () => Promise<T>, ttl?: WrapTTL<T>): Promise<T> {
    return this.cacheManagerConfiguration.cache.wrap(key, fn, ttl);
  }
}
