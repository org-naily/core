import { IsIn, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "@org-naily/class-validator";
import { MemoryConfig } from "cache-manager";
import { RedisOptions } from "ioredis";

export class CacheSchema<Extra extends Object = MemoryConfig | RedisOptions> {
  @IsIn(["memory", "redis"])
  @IsString()
  @IsNotEmpty()
  readonly type: "memory" | "ioredis";

  @IsObject()
  @IsOptional()
  readonly extraOptions?: Extra;
}
