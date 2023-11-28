import { Autowired, Configuration, Value } from "@org-naily/core";
import { Cache, CachingConfig, MemoryConfig, MultiCache, caching, multiCaching } from "cache-manager";
import { ValidatorService } from "@org-naily/class-validator";
import { CacheSchema } from "./schemas/cache.schema";
import { redisStore } from "cache-manager-ioredis-yet";
import sp from "synchronized-promise";
import { RedisOptions } from "ioredis";

@Configuration
export class CacheManagerConfiguration {
  @Value("naily.cache")
  private readonly cacheConfiguration: CacheSchema[];

  @Autowired
  private readonly validateService: ValidatorService;

  public cache: Cache;
  public multCache: MultiCache;

  constructor() {
    sp(this.validate)();
  }

  private async validate() {
    for (const config of this.cacheConfiguration) {
      const data = await this.validateService.validate(config, CacheSchema);
      if (data.length > 0) throw this.validateService.getFirstError(data[0]);
    }

    if (this.cacheConfiguration.length === 0) {
      throw new Error("No cache configuration found");
    } else if (this.cacheConfiguration.length === 1) {
      this.cache = sp(this.newCache)(this.cacheConfiguration[0]);
    } else {
      this.cache = sp(this.newCache)(this.cacheConfiguration[0]);
      this.multCache = multiCaching(this.cacheConfiguration.map((config) => sp(this.newCache)(config)));
    }
  }

  private async newCache(schema: CacheSchema) {
    if (schema.type === "memory") {
      return caching("memory", {
        ttl: (schema?.extraOptions as MemoryConfig)?.ttl,
        max: (schema?.extraOptions as MemoryConfig)?.max,
      });
    } else if (schema.type === "ioredis") {
      return caching(await redisStore(schema.extraOptions as RedisOptions));
    }
  }
}
