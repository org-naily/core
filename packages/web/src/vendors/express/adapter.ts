import { IAdapterOptions } from "../../typings/common.typing";

export function createExpressAdapter<Request, Response, NextFunction>(option: () => IAdapterOptions<Request, Response, NextFunction>) {
  return option();
}
