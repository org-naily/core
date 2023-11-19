import { Type } from "@org-naily/core";

export type NHttpMethod = "get" | "post" | "put" | "delete" | "patch" | "options" | "head" | "all" | "trace";
export type NUpperCaseHttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD" | "ALL" | "TRACE";
export type ReflectedType<T = any> = Function | Object | String | Number | Boolean | Symbol | undefined | null | Type<T>;
export type DecoratorType = "request" | "response" | "next" | "body" | "query" | "params" | "headers" | "cookies" | "ip" | "ips" | "other";

export interface NailyWebConfiguration extends NIOC.BaseFactoryOptions {}

export namespace NPipe {
  export interface Host {
    getRequest<T = any>(): T;
    getResponse<T = any>(): T;
    getContext<T = any>(): T;
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
    getContext<T = any>(): T;
    getHttpMethod(): NHttpMethod;
  }
}
export interface NFilter {
  beforeExecute?(host: NFilter.Host): void | Promise<void>;
  afterExecute?(host: NFilter.Host): void | Promise<void>;
  catch?(error: any, host: NFilter.Host): void | Promise<void>;
  finallyExecute?(host: NFilter.Host): void | Promise<void>;
}
