import { INailyApplicationOptions } from "@naily/core";

export interface INailyInjectableScanner {
  scan<T extends string>(path: T, options: INailyApplicationOptions): T;
}
