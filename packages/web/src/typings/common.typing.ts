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
