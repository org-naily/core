/*
 * @Author: Zero的Mac 1203970284@qq.com
 * @Date: 2023-09-25 12:36:41
 * @LastEditors: Zero的Mac 1203970284@qq.com
 * @LastEditTime: 2023-09-25 14:03:45
 * @FilePath: /v5/packages/core/src/typings/web/web.typing.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { Type } from "../common.typing";

export type AdapterRequest<T extends Object> = (req: T) => T;
export type AdapterResponse<T = any> = T;
export type AdapterMethod = "get" | "post" | "put" | "delete" | "patch" | "options" | "head" | "trace" | "all";
export type AdapterQuery = {
  [key: string]: undefined | string | string[] | AdapterQuery | AdapterQuery[];
};
export interface NailyAdapterHost<REQUEST, RESPONSE> {
  path: string;
  method: AdapterMethod;
  request: AdapterRequest<REQUEST>;
  response: AdapterResponse<RESPONSE>;
  params: {
    [key: string]: string;
  };
  query: AdapterQuery;
  body: any;
  ip: string;
}
export interface NailyAdapterContext {
  getInstance(): Type;
}
export interface NailyControllerAdapter {
  methodIntercept(host: NailyAdapterHost<any, any>, ctx: NailyAdapterContext): void | Promise<void>;
  listenerIntercept(port: number): void | Promise<void>;
}
