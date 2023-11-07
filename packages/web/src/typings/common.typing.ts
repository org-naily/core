import { Type } from "@naily/core";

export const HttpMethod = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch",
  HEAD: "head",
  OPTIONS: "options",
  ALL: "all",
  TRACE: "trace",
} as const;
export type IHttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod];
export namespace NExpAdapter {
  export interface HandlerOptions {
    query: any;
    body: any;
    params: any;
    headers: any;
    cookies: any;
    ip: string;
    ips: string[];
    req: any;
    res: any;
    next: any;
  }
}
export interface NExpAdapter {
  listen(port: number, callBack: (port: number) => void): void;
  handler(path: string, method: IHttpMethod, handler: (options: NExpAdapter.HandlerOptions) => any | Promise<any>): void;
}
export namespace NPipe {
  export interface Metadata {
    user: "param" | "query" | "body" | undefined;
    key: string | undefined;
    type: any | undefined;
  }
  export interface PipeMetadata {
    user: "param" | "query" | "body";
    key: string | undefined;
    pipes: Type<NPipe>[];
  }
}
export interface NPipe {
  transform(value: any, metadata: NPipe.Metadata): any;
}
