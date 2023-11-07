import { IHttpMethod } from "./common.typing";

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
  export interface HandlerReturn {
    body: any;
    haveError: boolean;
  }
}
export interface NExpAdapter<Request = any, Response = any, NextFunction = Function> {
  useMiddleware(handler: (req: Request, res: Response, next: NextFunction) => void): void;
  listen<T>(port: number, callBack: (port: number) => void): T;
  handler(path: string, method: IHttpMethod, handler: (options: NExpAdapter.HandlerOptions) => Promise<NExpAdapter.HandlerReturn>): void;
}
