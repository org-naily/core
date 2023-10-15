export interface IAdapterHandler {
  query: any;
  params: any;
  body: any;
  cookies: any;
  headers: any;
  ip: any;
  ips: any;
}

export interface IAdapterOptions<Request = any, Response = any, NextFunction = any> {
  /**
   * Listen on the specified port.
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/15
   * @memberof IAdapterOptions
   */
  listen(port: number, afterListen: () => void): void;
  /**
   * Implment middleware.
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/15
   * @memberof IAdapterOptions
   */
  middleware(req: Request, res: Response, next: NextFunction): void;
  /**
   * Implement handler.
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/15
   * @memberof IAdapterOptions
   */
  handler(
    path: string,
    method: "get" | "post" | "put" | "delete" | "patch" | "head" | "options" | "trace" | "all",
    handler: (req: Request, res: Response, next: NextFunction, option: IAdapterHandler) => any | Promise<any>
  ): void;
}
