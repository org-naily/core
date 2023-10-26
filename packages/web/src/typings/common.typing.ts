import { INailyWebImpl } from "./impl.typing";

export namespace INailyWeb {
  export const enum HttpMethod {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
    OPTIONS = "options",
    HEAD = "head",
    PATCH = "patch",
    ALL = "all",
    TRACE = "trace",
  }
  export interface ExpAdapterHandler<Request = object, Response = object, NextFunction extends Function = Function> {
    req: Request;
    res: Response;
    next: NextFunction;
    params: any;
    query: any;
    body: any;
    headers: any;
    cookies: any;
    ip: string;
  }
  export interface AdapterPipeArgumentHost<Request, Response> {
    req: Request;
    res: Response;
    params: any;
    query: any;
    body: any;
  }
  export interface ExpAdapter<Request = object, Response = object, NextFunction extends Function = Function> {
    /**
     * [EN]
     * ## Middleware function definition
     *
     * ---
     * [ZH]
     * ## 定义中间件函数
     *
     * ---
     *
     * @author Zero <gczgroup@qq.com>
     * @date 2023/10/25
     * @param {(<T>(req: Request, res: Response, next: NextFunction) => T | void)} middleware
     * @memberof ExpAdapter
     */
    use(middleware: <T>(req: Request, res: Response, next: NextFunction) => T | void): void;
    initPipe(
      host: (
        argument: AdapterPipeArgumentHost<Request, Response>
      ) => Promise<AdapterPipeArgumentHost<Request, Response>> | AdapterPipeArgumentHost<Request, Response>
    ): void;
    /**
     * [EN]
     * ## Start listening for connections on the specified port
     *
     * ---
     * [ZH]
     * ## 定义监听函数
     *
     * @author Zero <gczgroup@qq.com>
     * @date 2023/10/25
     * @template T
     * @param {number} port
     * @param {() => void} [callback]
     * @return {*}  {(T | void)}
     * @memberof ExpAdapter
     */
    listen(port: number, callback?: () => void): any;
    /**
     * [EN]
     * ## Define the routing function
     *
     * ---
     * [ZH]
     * ## 定义路由函数
     *
     * @author Zero <gczgroup@qq.com>
     * @date 2023/10/25
     * @param {HttpMethod} method
     * @param {string} path
     * @param {<T>(options: ExpAdapterHandler<Request, Response, NextFunction>) => T} callback
     * @memberof ExpAdapter
     */
    handler(method: HttpMethod, path: string, callback: <T>(options: ExpAdapterHandler<Request, Response, NextFunction>) => T): void;
  }
}