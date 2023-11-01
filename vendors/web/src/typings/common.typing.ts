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
export type HttpMethodType = "get" | "post" | "put" | "delete" | "patch" | "options" | "head" | "all" | "trace";
export interface WebArgumentHost {
  getPath(): string;
  getMethod(): HttpMethodType;
}
export interface WebExpExtractor {
  req: any;
  res: any;
  next: Function;
  params: any;
  query: any;
  body: any;
  headers: any;
  cookies: any;
  ip: string;
  ips: string[];
}
export interface NExpAdapter<Request, Response, NextFunction> {
  use(handler: (req: Request, res: Response, next: NextFunction) => any): any;
  handler(argumentHost: WebArgumentHost, extractor: (options: WebExpExtractor) => Promise<any> | any): void;
  listen(port: number, callback?: (port: number) => any): any;
}