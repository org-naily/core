import { Injectable, Type } from "@naily/core";
import { NailyWebConstant } from "../constants";
import { INailyWebImpl } from "../typings";
import { NailyWebFactoryRepository } from "../factories";

export function Pipe(key?: string) {
  return (target: Type<INailyWebImpl.WebPipe>) => {
    Injectable(key)(target);
    Reflect.defineMetadata(NailyWebConstant.PIPE, true, target);
    new NailyWebFactoryRepository().getContext().add(target);
  };
}

export function Guard(key?: string) {
  return (target: Type<INailyWebImpl.WebGuard>) => {
    Injectable(key)(target);
    Reflect.defineMetadata(NailyWebConstant.GUARD, true, target);
    new NailyWebFactoryRepository().getContext().add(target);
  };
}

export function ExceptionFilter(key?: string) {
  return (target: Type<INailyWebImpl.WebExceptionFilter>) => {
    Injectable(key)(target);
    Reflect.defineMetadata(NailyWebConstant.EXCEPTION_FILTER, true, target);
    new NailyWebFactoryRepository().getContext().add(target);
  };
}
