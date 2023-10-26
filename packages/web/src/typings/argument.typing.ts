/**
 * Exp Http Context
 *
 * @author Zero <gczgroup@qq.com>
 * @date 2023/10/26
 * @export
 * @interface NWebExpHttpContext
 */
export interface NWebExpHttpContext {
  getRequest(): any;
  getResponse(): any;
}

/**
 * Ctx Http Context
 *
 * @author Zero <gczgroup@qq.com>
 * @date 2023/10/26
 * @export
 * @type {NWebCtxHttpContext<T>}
 * @template T Adapter Context
 */
export type NWebCtxHttpContext<T> = T;

/**
 * General argument host
 *
 * @author Zero <gczgroup@qq.com>
 * @date 2023/10/26
 * @export
 * @interface NWebExpArgumentHost
 * @template HttpContext HttpContext
 */
export interface NWebExpArgumentHost<HttpContext = NWebExpHttpContext | NWebCtxHttpContext<any>> {
  getHttpContext(): HttpContext;
}

/**
 * Pipe argument host
 *
 * @author Zero <gczgroup@qq.com>
 * @date 2023/10/26
 * @export
 * @interface NWebExpPipeArgumentHost
 * @extends {NWebExpArgumentHost<HttpContext>}
 * @template HttpContext
 */
export interface NWebExpPipeArgumentHost<HttpContext = NWebExpHttpContext> extends NWebExpArgumentHost<HttpContext> {
  getType(): any;
}
