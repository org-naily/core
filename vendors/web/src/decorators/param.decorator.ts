import { NailyWebWatermark } from "../constants/warermark.constant";

export interface HaveParameterOptions {
  type: "params" | "query" | "body" | "headers";
  key?: string;
  index: number;
}

export interface NoParameterOptions {
  type: "cookies" | "ip" | "ips" | "req" | "res" | "next";
  index: number;
}

export type ParameterOptions = HaveParameterOptions | NoParameterOptions;

export function Params(key?: string) {
  return (target: Object, propertyKey: string, index: number) => {
    const oldParams: ParameterOptions[] = Reflect.getMetadata(NailyWebWatermark.PARAMETERS, target, propertyKey) || [];
    oldParams[index] = { type: "params", key, index };
    Reflect.defineMetadata(NailyWebWatermark.PARAMETERS, oldParams, target, propertyKey);
  };
}

export function Query(key?: string) {
  return (target: Object, propertyKey: string, index: number) => {
    const oldParams: ParameterOptions[] = Reflect.getMetadata(NailyWebWatermark.PARAMETERS, target, propertyKey) || [];
    oldParams[index] = { type: "query", key, index };
    Reflect.defineMetadata(NailyWebWatermark.PARAMETERS, oldParams, target, propertyKey);
  };
}

export function Body(key?: string) {
  return (target: Object, propertyKey: string, index: number) => {
    const oldParams: ParameterOptions[] = Reflect.getMetadata(NailyWebWatermark.PARAMETERS, target, propertyKey) || [];
    oldParams[index] = { type: "body", key, index };
    Reflect.defineMetadata(NailyWebWatermark.PARAMETERS, oldParams, target, propertyKey);
  };
}

export function Headers(key?: string) {
  return (target: Object, propertyKey: string, index: number) => {
    const oldParams: ParameterOptions[] = Reflect.getMetadata(NailyWebWatermark.PARAMETERS, target, propertyKey) || [];
    oldParams[index] = { type: "headers", key, index };
    Reflect.defineMetadata(NailyWebWatermark.PARAMETERS, oldParams, target, propertyKey);
  };
}

export function Cookies() {
  return (target: Object, propertyKey: string, index: number) => {
    const oldParams: ParameterOptions[] = Reflect.getMetadata(NailyWebWatermark.PARAMETERS, target, propertyKey) || [];
    oldParams[index] = { type: "cookies", index };
    Reflect.defineMetadata(NailyWebWatermark.PARAMETERS, oldParams, target, propertyKey);
  };
}

export function Ip() {
  return (target: Object, propertyKey: string, index: number) => {
    const oldParams: ParameterOptions[] = Reflect.getMetadata(NailyWebWatermark.PARAMETERS, target, propertyKey) || [];
    oldParams[index] = { type: "ip", index };
    Reflect.defineMetadata(NailyWebWatermark.PARAMETERS, oldParams, target, propertyKey);
  };
}

export function Ips() {
  return (target: Object, propertyKey: string, index: number) => {
    const oldParams: ParameterOptions[] = Reflect.getMetadata(NailyWebWatermark.PARAMETERS, target, propertyKey) || [];
    oldParams[index] = { type: "ips", index };
    Reflect.defineMetadata(NailyWebWatermark.PARAMETERS, oldParams, target, propertyKey);
  };
}

export function Req() {
  return (target: Object, propertyKey: string, index: number) => {
    const oldParams: ParameterOptions[] = Reflect.getMetadata(NailyWebWatermark.PARAMETERS, target, propertyKey) || [];
    oldParams[index] = { type: "req", index };
    Reflect.defineMetadata(NailyWebWatermark.PARAMETERS, oldParams, target, propertyKey);
  };
}

export function Res() {
  return (target: Object, propertyKey: string, index: number) => {
    const oldParams: ParameterOptions[] = Reflect.getMetadata(NailyWebWatermark.PARAMETERS, target, propertyKey) || [];
    oldParams[index] = { type: "res", index };
    Reflect.defineMetadata(NailyWebWatermark.PARAMETERS, oldParams, target, propertyKey);
  };
}

export function Next() {
  return (target: Object, propertyKey: string, index: number) => {
    const oldParams: ParameterOptions[] = Reflect.getMetadata(NailyWebWatermark.PARAMETERS, target, propertyKey) || [];
    oldParams[index] = { type: "next", index };
    Reflect.defineMetadata(NailyWebWatermark.PARAMETERS, oldParams, target, propertyKey);
  };
}
