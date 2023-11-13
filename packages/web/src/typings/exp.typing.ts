import { NHttpMethod } from "./common.typing";

export interface NExpAdapter<Request = any, Response = any, NextFunction = Function> {
  handler(argument: NExpAdapter.NExpAdapterHandlerArgumentHost<Request, Response>): any;
  middleware(handler: (req: Request, res: Response, next: NextFunction) => void): void;
  listen(port: number, callBack: () => void): any;
}
export namespace NExpAdapter {
  export interface NExpAdapterHandlerArgument {
    params: any;
    query: any;
    body: any;
    headers: any;
    cookies: any;
    ip: string;
    ips: string[];
    request: any;
    response: any;
    next: any;
  }
  export interface NExpAdapterHandlerReturn {
    value: any;
    haveError: boolean;
    isSended: boolean;
  }
  export interface NExpAdapterHandlerArgumentHost<Request, Response> {
    getPath(): string;
    getHttpMethod(): NHttpMethod;
    getHandler(options: NExpAdapterHandlerArgument): Promise<NExpAdapterHandlerReturn>;
  }
}
