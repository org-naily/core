import { IHttpMethod } from "./common.typing";

export interface IMethod {
  path: string;
  method: IHttpMethod;
}
export type Function = (...args: any[]) => any;
