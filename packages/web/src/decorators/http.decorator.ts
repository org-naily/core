import { Type } from "@naily/core";
import { NailyWebParamConstant } from "../constants";
import { INailyWebImpl } from "../typings";

interface ParameterMeta {
  index: number;
}

interface ParameterMetaPipe extends ParameterMeta {
  pipes: Type<INailyWebImpl.WebPipe>[];
}

export function Req() {
  return (target: Object, key: string | symbol, index: number) => {
    const oldReq: ParameterMeta[] = Reflect.getMetadata(NailyWebParamConstant.REQUEST, target, key) || [];
    Reflect.defineMetadata(NailyWebParamConstant.REQUEST, [...oldReq, { index }], target, key);
  };
}

export function Res() {
  return (target: Object, key: string | symbol, index: number) => {
    const oldRes: ParameterMeta[] = Reflect.getMetadata(NailyWebParamConstant.RESPONSE, target, key) || [];
    Reflect.defineMetadata(NailyWebParamConstant.RESPONSE, [...oldRes, { index }], target, key);
  };
}

export function Next() {
  return (target: Object, key: string | symbol, index: number) => {
    const oldNext: ParameterMeta[] = Reflect.getMetadata(NailyWebParamConstant.NEXT, target, key) || [];
    Reflect.defineMetadata(NailyWebParamConstant.NEXT, [...oldNext, { index }], target, key);
  };
}

export function Context() {
  return (target: Object, key: string | symbol, index: number) => {
    const oldContext: ParameterMeta[] = Reflect.getMetadata(NailyWebParamConstant.CONTEXT, target, key) || [];
    Reflect.defineMetadata(NailyWebParamConstant.CONTEXT, [...oldContext, { index }], target, key);
  };
}

export function Params(...pipes: Type<INailyWebImpl.WebPipe>[]) {
  return (target: Object, key: string | symbol, index: number) => {
    const oldParams: ParameterMetaPipe[] = Reflect.getMetadata(NailyWebParamConstant.PARAMS, target, key) || [];
    Reflect.defineMetadata(NailyWebParamConstant.PARAMS, [...oldParams, { index, pipes }], target, key);
  };
}

export function Query(...pipes: Type<INailyWebImpl.WebPipe>[]) {
  return (target: Object, key: string | symbol, index: number) => {
    const oldQuery: ParameterMetaPipe[] = Reflect.getMetadata(NailyWebParamConstant.QUERY, target, key) || [];
    Reflect.defineMetadata(NailyWebParamConstant.QUERY, [...oldQuery, { index, pipes }], target, key);
  };
}

export function Body(...pipes: Type<INailyWebImpl.WebPipe>[]) {
  return (target: Object, key: string | symbol, index: number) => {
    const oldBody: ParameterMetaPipe[] = Reflect.getMetadata(NailyWebParamConstant.BODY, target, key) || [];
    Reflect.defineMetadata(NailyWebParamConstant.BODY, [...oldBody, { index, pipes }], target, key);
  };
}

export function Headers() {
  return (target: Object, key: string | symbol, index: number) => {
    const oldHeaders: ParameterMeta[] = Reflect.getMetadata(NailyWebParamConstant.HEADERS, target, key) || [];
    Reflect.defineMetadata(NailyWebParamConstant.HEADERS, [...oldHeaders, { index }], target, key);
  };
}

export function Cookies() {
  return (target: Object, key: string | symbol, index: number) => {
    const oldCookies: ParameterMeta[] = Reflect.getMetadata(NailyWebParamConstant.COOKIES, target, key) || [];
    Reflect.defineMetadata(NailyWebParamConstant.COOKIES, [...oldCookies, { index }], target, key);
  };
}

export function Ip() {
  return (target: Object, key: string | symbol, _index: number) => {
    Reflect.defineMetadata(NailyWebParamConstant.IP, true, target, key);
  };
}
