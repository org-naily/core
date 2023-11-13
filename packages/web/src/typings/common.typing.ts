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
  interface NWebAdviceContext {
    getRequest<T = any>(): T;
    getResponse<T = any>(): T;
  }
  export interface NWebAdviceBeforeContext extends NWebAdviceContext {}
  export interface NWebAdviceAfterContext extends NWebAdviceContext {
    getResponseValue<T = any>(): T;
    setResponseValue<T = any>(newValue: T): void;
  }
  export interface NWebAdviceErrorContext extends NWebAdviceContext {}
}
export interface NExpWebAdvice {
  beforeExecution?(ctx: NExpWebAdvice.NWebAdviceBeforeContext): Promise<boolean> | boolean;
  afterExecution?(ctx: NExpWebAdvice.NWebAdviceAfterContext): Promise<boolean> | boolean;
  onError?(exception: any, ctx: NExpWebAdvice.NWebAdviceErrorContext): Promise<boolean> | boolean;
}
