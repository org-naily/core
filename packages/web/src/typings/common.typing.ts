import { HttpMethod } from "../constants/method.constant";

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
  listen(port: number, afterListen: () => void): any;
  /**
   * Implment middleware.
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/15
   * @memberof IAdapterOptions
   */
  middleware<T = any>(...args: any[]): T;

  /**
   * Implement handler.
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/15
   * @memberof IAdapterOptions
   */
  handler(
    path: string,
    method: HttpMethod,
    handler: (req: Request, res: Response, next: NextFunction, option: IAdapterHandler) => any | Promise<any>
  ): void;
}
