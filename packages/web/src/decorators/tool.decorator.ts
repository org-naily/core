import { Injectable, Type } from "@naily/core";
import { NailyWebConstant } from "../constants";
import { INailyWeb } from "../typings";

export function Pipe<Before = any, After = any>(key?: string) {
  return (target: Type<INailyWeb.WebPipe<Before, After>>) => {
    Injectable(key)(target);
    Reflect.defineMetadata(NailyWebConstant.PIPE, true, target);
  };
}

export function Guard(key?: string) {
  return (target: Type<INailyWeb.WebGuard>) => {
    Injectable(key)(target);
    Reflect.defineMetadata(NailyWebConstant.GUARD, true, target);
  };
}

export function ExceptionFilter(key?: string) {
  return (target: Type<INailyWeb.WebExceptionFilter>) => {
    Injectable(key)(target);
    Reflect.defineMetadata(NailyWebConstant.EXCEPTION_FILTER, true, target);
  };
}
