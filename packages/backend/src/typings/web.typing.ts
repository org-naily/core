import { Type } from "@naily/core";

export type NHttpMethod = "get" | "post" | "put" | "delete" | "patch" | "options" | "head" | "all" | "trace";
export type ReflectedType<T = any> = Function | Object | String | Number | Boolean | Symbol | undefined | null | Type<T>;
export type DecoratorType = "request" | "response" | "next" | "body" | "query" | "params" | "headers" | "cookies" | "ip" | "ips" | "other";

export interface NailyWebConfiguration {}

export namespace NPipe {
  export interface Host {
    getRequest<T = any>(): T;
    getResponse<T = any>(): T;
    getHttpMethod(): NHttpMethod;
    getDecoratorType(): "body" | "query" | "params";
    getName(): string;
  }
}
export interface NPipe {
  transform(value: any, host: NPipe.Host): any;
}

export namespace NFilter {
  export interface Host {
    getRequest<T = any>(): T;
    getResponse<T = any>(): T;
    getHttpMethod(): NHttpMethod;
  }
}
export interface NFilter {
  catch(error: any, host: NFilter.Host): void | Promise<void>;
}
