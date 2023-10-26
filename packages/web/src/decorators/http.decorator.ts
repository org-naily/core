import { Type } from "@naily/core";
import { NailyWebParamConstant } from "../constants";
import { INailyWebImpl } from "../typings";

interface ParameterMeta {
  index: number;
}

interface ParameterMetaPipe extends ParameterMeta {
  pipes: Type<INailyWebImpl.WebPipe>[];
}

export function Req(target: Object, key: string | symbol, index: number) {
  const oldReq: ParameterMeta[] = Reflect.getMetadata(NailyWebParamConstant.REQUEST, target, key) || [];
  Reflect.defineMetadata(
    NailyWebParamConstant.REQUEST,
    [
      ...oldReq,
      {
        index,
      },
    ],
    target,
    key
  );
}

export function Res(target: Object, key: string | symbol, index: number) {
  const oldRes: ParameterMeta[] = Reflect.getMetadata(NailyWebParamConstant.RESPONSE, target, key) || [];
  Reflect.defineMetadata(NailyWebParamConstant.RESPONSE, [...oldRes, { index }], target, key);
}

export function Next(target: Object, key: string | symbol, index: number) {
  const oldNext: ParameterMeta[] = Reflect.getMetadata(NailyWebParamConstant.NEXT, target, key) || [];
  Reflect.defineMetadata(NailyWebParamConstant.NEXT, [...oldNext, { index }], target, key);
}

export function Context(target: Object, key: string | symbol, index: number) {
  const oldContext: ParameterMeta[] = Reflect.getMetadata(NailyWebParamConstant.CONTEXT, target, key) || [];
  Reflect.defineMetadata(NailyWebParamConstant.CONTEXT, [...oldContext, { index }], target, key);
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
