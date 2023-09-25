/*
 * @Author: Zero的Mac 1203970284@qq.com
 * @Date: 2023-09-25 13:09:08
 * @LastEditors: Zero的Mac 1203970284@qq.com
 * @LastEditTime: 2023-09-25 13:09:34
 * @FilePath: /v5/packages/core/src/decorator/web/post.decorator.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { POST_WATERMARK } from "../../constant/constant";

export function Post(path: string = "/"): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(POST_WATERMARK, path, target, propertyKey);
  };
}
