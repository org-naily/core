import { INFO_WATERMARK } from "../constants/info.constant";

export function Query(target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) {
  const indexs: number[] = Reflect.getMetadata(INFO_WATERMARK.QUERY, target, propertyKey) || [];
  indexs.push(parameterIndex);
  Reflect.defineMetadata(INFO_WATERMARK.QUERY, indexs, target, propertyKey);
}

export function Body(target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) {
  const indexs: number[] = Reflect.getMetadata(INFO_WATERMARK.BODY, target, propertyKey) || [];
  indexs.push(parameterIndex);
  Reflect.defineMetadata(INFO_WATERMARK.BODY, indexs, target, propertyKey);
}

export function Params(target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) {
  const indexs: number[] = Reflect.getMetadata(INFO_WATERMARK.PARAMS, target, propertyKey) || [];
  indexs.push(parameterIndex);
  Reflect.defineMetadata(INFO_WATERMARK.PARAMS, indexs, target, propertyKey);
}

export function Headers(target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) {
  const indexs: number[] = Reflect.getMetadata(INFO_WATERMARK.HEADERS, target, propertyKey) || [];
  indexs.push(parameterIndex);
  Reflect.defineMetadata(INFO_WATERMARK.HEADERS, indexs, target, propertyKey);
}

export function Cookies(target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) {
  const indexs: number[] = Reflect.getMetadata(INFO_WATERMARK.COOKIES, target, propertyKey) || [];
  indexs.push(parameterIndex);
  Reflect.defineMetadata(INFO_WATERMARK.COOKIES, indexs, target, propertyKey);
}

export function Ip(target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) {
  const indexs: number[] = Reflect.getMetadata(INFO_WATERMARK.IP, target, propertyKey) || [];
  indexs.push(parameterIndex);
  Reflect.defineMetadata(INFO_WATERMARK.IP, indexs, target, propertyKey);
}

export function Ips(target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) {
  const indexs: number[] = Reflect.getMetadata(INFO_WATERMARK.IPS, target, propertyKey) || [];
  indexs.push(parameterIndex);
  Reflect.defineMetadata(INFO_WATERMARK.IPS, indexs, target, propertyKey);
}
