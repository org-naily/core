export namespace NWeb {
  export interface NControllerMetadata {
    path: string;
  }
  export interface NMethodMetadata {
    method: NHttpMethod;
    path: string;
  }
}
export const enum HttpMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch",
  OPTIONS = "options",
  HEAD = "head",
  ALL = "all",
  TRACE = "trace",
}
export type NHttpMethod = "get" | "post" | "put" | "delete" | "patch" | "options" | "head" | "all" | "trace";
export namespace NExpWebAdvice {
  interface Context {
    getRequest<T = any>(): T;
    getResponse<T = any>(): T;
    getParamTypes(): any[];
  }
  export interface BeforeContext extends Context {}
  export interface AfterContext extends Context {
    getResponseValue<T = any>(): T;
    setResponseValue<T = any>(newValue: T): void;
  }
  export interface ErrorContext extends Context {}

  export interface ParameterMetadataHasKey {
    type: "params" | "query" | "body" | "headers";
    key: string | undefined;
  }
  export interface ParameterMetadataNoKey {
    type: "cookies" | "ip" | "ips";
  }
  export interface ParameterMetadataHost {
    type: "request" | "response" | "next";
  }
  export interface ParameterMetadataFile {
    type: "file" | "files";
    key: string;
  }
  export type ParameterMetadata = ParameterMetadataHasKey | ParameterMetadataNoKey | ParameterMetadataHost | ParameterMetadataFile;
}
export interface NExpWebAdvice {
  beforeExecution?(ctx: NExpWebAdvice.BeforeContext): Promise<boolean> | boolean;
  afterExecution?(ctx: NExpWebAdvice.AfterContext): Promise<boolean> | boolean;
  onError?(exception: any, ctx: NExpWebAdvice.ErrorContext): Promise<boolean> | boolean;
}
