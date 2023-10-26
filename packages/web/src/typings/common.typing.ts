export interface NWebExpHttpContext {
  getRequest(): any;
  getResponse(): any;
}

/**
 * General argument host
 *
 * @author Zero <gczgroup@qq.com>
 * @date 2023/10/26
 * @export
 * @interface NWebExpArgumentHost
 * @template HttpContext
 */
export interface NWebExpArgumentHost<HttpContext = NWebExpHttpContext> {
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
