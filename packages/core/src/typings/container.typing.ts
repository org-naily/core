/*
 * @Author: Zero的Mac 1203970284@qq.com
 * @Date: 2023-09-24 23:32:13
 * @LastEditors: Zero的Mac 1203970284@qq.com
 * @LastEditTime: 2023-09-24 23:35:06
 * @FilePath: /v5/packages/core/src/typings/container.typing.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { Type } from "./common.typing";

export interface IInjectableContainer {
  object: Object;
  target: Type;
}
