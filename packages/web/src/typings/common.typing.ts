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
    getRequest<T>(): T;
    getResponse<T>(): T;
  }
  export interface NWebAdviceBeforeContext extends NWebAdviceContext {}
  export interface NWebAdviceAfterContext extends NWebAdviceContext {}
  export interface NWebAdviceErrorContext extends NWebAdviceContext {}
}
export interface NExpWebAdvice {
  beforeExecution?(ctx: NExpWebAdvice.NWebAdviceBeforeContext): Promise<void> | void;
  afterExecution?(ctx: NExpWebAdvice.NWebAdviceAfterContext): Promise<void> | void;
  onError?(exception: any, ctx: NExpWebAdvice.NWebAdviceErrorContext): Promise<void> | void;
}
