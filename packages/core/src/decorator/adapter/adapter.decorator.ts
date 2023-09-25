/*
 * @Author: Zero的Mac 1203970284@qq.com
 * @Date: 2023-09-24 23:47:42
 * @LastEditors: Zero的Mac 1203970284@qq.com
 * @LastEditTime: 2023-09-25 12:38:48
 * @FilePath: /v5/packages/core/src/decorator/adapter.decorator.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { CONTROLLERADAPTER_WATERMARK } from "../../constant/constant";
import { NailyControllerAdapter, Type } from "../../typings";

export function ControllerAdapter(target: Type<NailyControllerAdapter>) {
  Reflect.defineMetadata(CONTROLLERADAPTER_WATERMARK, true, target);
}
