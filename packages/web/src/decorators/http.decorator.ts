import { NailyWebParamConstant } from "../constants";

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

export function Params(target: Object, key: string | symbol, _index: number) {
  Reflect.defineMetadata(NailyWebParamConstant.PARAMS, true, target, key);
}

export function Query(target: Object, key: string | symbol, _index: number) {
  Reflect.defineMetadata(NailyWebParamConstant.QUERY, true, target, key);
}

export function Body(target: Object, key: string | symbol, _index: number) {
  Reflect.defineMetadata(NailyWebParamConstant.BODY, true, target, key);
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
