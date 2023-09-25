/*
 * @Author: Zero的Mac 1203970284@qq.com
 * @Date: 2023-09-24 22:59:57
 * @LastEditors: Zero的Mac 1203970284@qq.com
 * @LastEditTime: 2023-09-25 12:36:49
 * @FilePath: /v5/packages/core/src/typings/common.typing.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { NailyControllerAdapter } from "./web";

export interface Type<R = any> extends Function {
  new (): R;
}

export interface onInit {
  handleInit(): void | Promise<void>;
}

export interface IConfiguration {
  controllerAdapter?: Type<NailyControllerAdapter>;
}

export interface IConfigurationBooter {
  main(): number;
}
