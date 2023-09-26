/*
 * @Author: Zero的Mac 1203970284@qq.com
 * @Date: 2023-09-24 22:59:35
 * @LastEditors: Zero的Mac 1203970284@qq.com
 * @LastEditTime: 2023-09-26 09:04:29
 * @FilePath: /v5/packages/core/src/decorator/ioc/injectable.decorator.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { Type } from "../../typings/common.typing";
import { injectableContainer } from "../../container/container";
import { INJECTABLE_WATERMARK } from "../../constant/constant";

export function Injectable(target: Type) {
  Reflect.defineMetadata(INJECTABLE_WATERMARK, true, target);
  const newed = new target();
  injectableContainer.push({
    target: target,
    object: newed,
  });
  if (newed.handleInit) newed.handleInit();
}
