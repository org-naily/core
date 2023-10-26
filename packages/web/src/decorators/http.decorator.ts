import { Type } from "@naily/core";
import { NailyWebParamConstant } from "../constants";
import { INailyWebImpl } from "../typings";

export function Req(target: Object, key: string | symbol, _index: number) {
  Reflect.defineMetadata(NailyWebParamConstant.REQUEST, true, target, key);
}

export function Res(target: Object, key: string | symbol, _index: number) {
  Reflect.defineMetadata(NailyWebParamConstant.RESPONSE, true, target, key);
}

export function Next(target: Object, key: string | symbol, _index: number) {
  Reflect.defineMetadata(NailyWebParamConstant.NEXT, true, target, key);
}

export function Context(target: Object, key: string | symbol, _index: number) {
  Reflect.defineMetadata(NailyWebParamConstant.CONTEXT, true, target, key);
}

export function Params(...pipes: Type<INailyWebImpl.WebPipe>[]) {
  return (target: Object, key: string | symbol, _index: number) => {
    Reflect.defineMetadata(NailyWebParamConstant.PARAMS, pipes, target, key);
  };
}

export function Query(...pipes: Type<INailyWebImpl.WebPipe>[]) {
  return (target: Object, key: string | symbol, _index: number) => {
    Reflect.defineMetadata(NailyWebParamConstant.QUERY, pipes, target, key);
  };
}

export function Body(...pipes: Type<INailyWebImpl.WebPipe>[]) {
  return (target: Object, key: string | symbol, _index: number) => {
    Reflect.defineMetadata(NailyWebParamConstant.BODY, pipes, target, key);
  };
}

export function Headers(target: Object, key: string | symbol, _index: number) {
  Reflect.defineMetadata(NailyWebParamConstant.HEADERS, true, target, key);
}

export function Cookies(target: Object, key: string | symbol, _index: number) {
  Reflect.defineMetadata(NailyWebParamConstant.COOKIES, true, target, key);
}

export function Ip(target: Object, key: string | symbol, _index: number) {
  Reflect.defineMetadata(NailyWebParamConstant.IP, true, target, key);
}
