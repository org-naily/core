import { IAdapterOptions } from "../typings/common.typing";

export function createAdapter<Request, Response, NextFunction>(option: () => IAdapterOptions<Request, Response, NextFunction>) {
  return option();
}
