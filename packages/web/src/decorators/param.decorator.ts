import "reflect-metadata";
import { NailyWebWatermark } from "../constants/watermark.constant";

export function Req() {
  return (target: Object, propertyKey: string | symbol, index: number) => {
    Reflect.defineMetadata(NailyWebWatermark.REQ, index, target, propertyKey);
  };
}

export function Res() {
  return (target: Object, propertyKey: string | symbol, index: number) => {
    Reflect.defineMetadata(NailyWebWatermark.RES, index, target, propertyKey);
  };
}

export function Next() {
  return (target: Object, propertyKey: string | symbol, index: number) => {
    Reflect.defineMetadata(NailyWebWatermark.NEXT, index, target, propertyKey);
  };
}

export function Headers() {
  return (target: Object, propertyKey: string | symbol, index: number) => {
    Reflect.defineMetadata(NailyWebWatermark.HEADERS, index, target, propertyKey);
  };
}

export function Param() {
  return (target: Object, propertyKey: string | symbol, index: number) => {
    Reflect.defineMetadata(NailyWebWatermark.PARAM, index, target, propertyKey);
  };
}

export function Query() {
  return (target: Object, propertyKey: string | symbol, index: number) => {
    Reflect.defineMetadata(NailyWebWatermark.QUERY, index, target, propertyKey);
  };
}

export function Body() {
  return (target: Object, propertyKey: string | symbol, index: number) => {
    Reflect.defineMetadata(NailyWebWatermark.BODY, index, target, propertyKey);
  };
}

export function Ip() {
  return (target: Object, propertyKey: string | symbol, index: number) => {
    Reflect.defineMetadata(NailyWebWatermark.IP, index, target, propertyKey);
  };
}
