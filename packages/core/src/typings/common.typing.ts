/*
 * @Author: Zero的Mac 1203970284@qq.com
 * @Date: 2023-09-24 22:59:57
 * @LastEditors: Zero的Mac 1203970284@qq.com
 * @LastEditTime: 2023-09-26 09:54:03
 * @FilePath: /v5/packages/core/src/typings/common.typing.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { NailyControllerAdapter } from "./web";

export interface Type<R = any> extends Function {
  new (): R;
}

export interface onInit {
  /**
   * ### The onInit hook
   *
   * app <sup>2</sup>
   *
   * @description This hook will call when before configuration initilize. This hook cannot read `@Value` decorator's content, because the configuration is not initialized yet. You can use this hook to do some work that needs to be done before the configuration is initialized, such as deleting the cache, etc. This hook is called before the onMounted hook, so you cannot use the variable initialized in the onMounted hook here.
   * @author Zero <gczgroup@qq.com>
   * @date 2023/09/26
   * @return {*}  {(void | Promise<void>)}
   * @memberof onInit
   */
  handleInit(): void | Promise<void>;
}

export interface onMounted {
  /**
   * ### The onMounted hook
   *
   * @description This hook will call when configuration initilized. Almost all initalize work should be done in this hook, such as database connection, etc. You can also use this hook to do some work that needs to be done after the configuration is initialized, such as sending a message to the console to indicate that the configuration is initialized successfully, etc. This hook is called after the onInit hook, so you can use the variable initialized in the onInit hook here, but you cannot use the variable initialized in the onMounted hook in the onInit hook, because the onInit hook is called before the configuration is initialized, and the onMounted hook is called after the configuration is initialized.
   * @author Zero <gczgroup@qq.com>
   * @date 2023/09/26
   * @return {*}  {(void | Promise<void>)}
   * @memberof onMounted
   */
  handleMounted(): void | Promise<void>;
}

export interface IConfiguration {
  controllerAdapter?: Type<NailyControllerAdapter>;
}

export interface IConfigurationBooter {
  main(): number;
}
