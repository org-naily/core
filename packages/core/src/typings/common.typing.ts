export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
export interface INailyApplication {
  /**
   * 入口文件路径
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/18
   * @type {string}
   * @memberof INailyApplication
   */
  entry: string;
  /**
   * 需要扫描的文件 glob路径
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/18
   * @type {string}
   * @memberof INailyApplication
   */
  scan: string;
  /**
   * 排除扫描的文件glob路径
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/19
   * @type {string[]}
   * @memberof INailyApplication
   */
  exclude: string[];
}
/**
 * Bean监听器的上下文
 *
 * @author Zero <gczgroup@qq.com>
 * @date 2023/10/15
 * @export
 * @interface INailyBeanContext
 * @template IArgs
 * @template INewed
 */
export interface INailyBeanContext<IArgs = any, INewed = object> {
  /**
   * 获取到此方法的参数
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/15
   * @return {*}  {IArgs[]}
   * @memberof INailyBeanContext
   */
  getArgs(): IArgs[];
  /**
   * 获取到此方法所属的类
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/15
   * @return {*}  {Type}
   * @memberof INailyBeanContext
   */
  getClass(): Type;

  /**
   * 获取到此方法所属的类的实例
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/15
   * @return {*}  {INewed}
   * @memberof INailyBeanContext
   */
  getNewed(): INewed;

  /**
   * 获取到此方法所属的类的实例的Naily Key
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/15
   * @return {*}  {string}
   * @memberof INailyBeanContext
   */
  getNailyKey(): string;
}
export interface INailyBeanContextAfterExecute<T = any> extends INailyBeanContext {
  /**
   * 获取到此方法的返回值
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/15
   * @return {*}  {T}
   * @memberof INailyBeanContextAfterExecute
   */
  getReturnValue(): T;
}
export interface INailyBeanBeforeExecute {
  /**
   * 执行Bean前的前置方法
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/15
   * @param {INailyBeanContext} context
   * @return {(void | Promise<void>)}
   * @memberof INailyBeanBeforeExecute
   */
  beforeExecute(context: INailyBeanContext): void | Promise<void>;
}
export interface INailyBeanAfterExecute {
  /**
   * 执行Bean后的后置方法
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/15
   * @param {INailyBeanContextAfterExecute} context
   * @return {(void | Promise<void>)}
   * @memberof INailyBeanAfterExecute
   */
  afterExecute(context: INailyBeanContextAfterExecute): void | Promise<void>;
}
