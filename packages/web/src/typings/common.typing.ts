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
