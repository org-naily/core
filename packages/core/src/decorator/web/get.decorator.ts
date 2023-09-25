/*
 * @Author: Zero的Mac 1203970284@qq.com
 * @Date: 2023-09-25 01:46:05
 * @LastEditors: Zero的Mac 1203970284@qq.com
 * @LastEditTime: 2023-09-25 12:52:25
 * @FilePath: /v5/packages/core/src/decorator/web/get.decorator.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { GET_WATERMARK } from "../../constant/constant";

export function Get(path: string = "/"): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(GET_WATERMARK, path, target, propertyKey);
  };
}
