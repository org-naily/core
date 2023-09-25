/*
 * @Author: Zero的Mac 1203970284@qq.com
 * @Date: 2023-09-25 01:40:52
 * @LastEditors: Zero的Mac 1203970284@qq.com
 * @LastEditTime: 2023-09-25 01:55:09
 * @FilePath: /v5/packages/core/src/decorator/web/controller.decorator.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { CONTROLLER_WATERMARK, INJECTABLE_WATERMARK } from "../../constant/constant";
import { Type } from "../../typings";
import { Injectable } from "../ioc";

export function Controller(path?: string): ClassDecorator;
export function Controller(path: string = "/") {
  return (target: Type) => {
    Injectable(target);
    Reflect.defineMetadata(CONTROLLER_WATERMARK, path, target);
  };
}
