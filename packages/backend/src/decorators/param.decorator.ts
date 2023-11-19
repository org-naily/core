import "reflect-metadata";
import { NPipe, NailyMapper, NailyWebWatermark } from "..";
import { Type } from "@naily/core";

export function Req(): ParameterDecorator;
export function Req() {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const oldMetadata: NailyMapper.ParamMapper[] = Reflect.getMetadata(NailyWebWatermark.PARAM, target, propertyKey) || [];
    oldMetadata[parameterIndex] = {
      type: Reflect.getMetadata("design:paramtypes", target, propertyKey)[parameterIndex],
      decoratorType: "request",
    };
    Reflect.defineMetadata(NailyWebWatermark.PARAM, oldMetadata, target, propertyKey);
  };
}

export function Res(): ParameterDecorator;
export function Res() {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const oldMetadata: NailyMapper.ParamMapper[] = Reflect.getMetadata(NailyWebWatermark.PARAM, target, propertyKey) || [];
    oldMetadata[parameterIndex] = {
      type: Reflect.getMetadata("design:paramtypes", target, propertyKey)[parameterIndex],
      decoratorType: "response",
    };
    Reflect.defineMetadata(NailyWebWatermark.PARAM, oldMetadata, target, propertyKey);
  };
}

export function Ctx(): ParameterDecorator;
export function Ctx() {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const oldMetadata: NailyMapper.ParamMapper[] = Reflect.getMetadata(NailyWebWatermark.PARAM, target, propertyKey) || [];
    oldMetadata[parameterIndex] = {
      type: Reflect.getMetadata("design:paramtypes", target, propertyKey)[parameterIndex],
      decoratorType: "context",
    };
    Reflect.defineMetadata(NailyWebWatermark.PARAM, oldMetadata, target, propertyKey);
  };
}

export function Next(): ParameterDecorator;
export function Next() {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const oldMetadata: NailyMapper.ParamMapper[] = Reflect.getMetadata(NailyWebWatermark.PARAM, target, propertyKey) || [];
    oldMetadata[parameterIndex] = {
      type: Reflect.getMetadata("design:paramtypes", target, propertyKey)[parameterIndex],
      decoratorType: "next",
    };
    Reflect.defineMetadata(NailyWebWatermark.PARAM, oldMetadata, target, propertyKey);
  };
}

export function Body(name?: string, ...pipes: Type<NPipe>[]): ParameterDecorator;
export function Body(...pipes: Type<NPipe>[]): ParameterDecorator;
export function Body(name?: string | Type<NPipe>, ...pipes: Type<NPipe>[]) {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const oldMetadata: NailyMapper.ParamMapper[] = Reflect.getMetadata(NailyWebWatermark.PARAM, target, propertyKey) || [];
    oldMetadata[parameterIndex] = {
      type: Reflect.getMetadata("design:paramtypes", target, propertyKey)[parameterIndex],
      decoratorType: "body",
      name: name && typeof name === "string" ? name : undefined,
      pipes: name && typeof name !== "string" ? [name, ...pipes] : pipes,
    };
    Reflect.defineMetadata(NailyWebWatermark.PARAM, oldMetadata, target, propertyKey);
  };
}

export function Query(name?: string, ...pipes: Type<NPipe>[]): ParameterDecorator;
export function Query(...pipes: Type<NPipe>[]): ParameterDecorator;
export function Query(name?: string | Type<NPipe>, ...pipes: Type<NPipe>[]) {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const oldMetadata: NailyMapper.ParamMapper[] = Reflect.getMetadata(NailyWebWatermark.PARAM, target, propertyKey) || [];
    oldMetadata[parameterIndex] = {
      type: Reflect.getMetadata("design:paramtypes", target, propertyKey)[parameterIndex],
      decoratorType: "query",
      name: name && typeof name === "string" ? name : undefined,
      pipes: name && typeof name !== "string" ? [name, ...pipes] : pipes,
    };
    Reflect.defineMetadata(NailyWebWatermark.PARAM, oldMetadata, target, propertyKey);
  };
}

export function Params(name?: string, ...pipes: Type<NPipe>[]): ParameterDecorator;
export function Params(...pipes: Type<NPipe>[]): ParameterDecorator;
export function Params(name?: string | Type<NPipe>, ...pipes: Type<NPipe>[]) {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const oldMetadata: NailyMapper.ParamMapper[] = Reflect.getMetadata(NailyWebWatermark.PARAM, target, propertyKey) || [];
    oldMetadata[parameterIndex] = {
      type: Reflect.getMetadata("design:paramtypes", target, propertyKey)[parameterIndex],
      decoratorType: "params",
      name: name && typeof name === "string" ? name : undefined,
      pipes: name && typeof name !== "string" ? [name, ...pipes] : pipes,
    };
    Reflect.defineMetadata(NailyWebWatermark.PARAM, oldMetadata, target, propertyKey);
  };
}

export function Headers(): ParameterDecorator;
export function Headers() {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const oldMetadata: NailyMapper.ParamMapper[] = Reflect.getMetadata(NailyWebWatermark.PARAM, target, propertyKey) || [];
    oldMetadata[parameterIndex] = {
      type: Reflect.getMetadata("design:paramtypes", target, propertyKey)[parameterIndex],
      decoratorType: "headers",
    };
    Reflect.defineMetadata(NailyWebWatermark.PARAM, oldMetadata, target, propertyKey);
  };
}

export function Cookies(): ParameterDecorator;
export function Cookies() {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const oldMetadata: NailyMapper.ParamMapper[] = Reflect.getMetadata(NailyWebWatermark.PARAM, target, propertyKey) || [];
    oldMetadata[parameterIndex] = {
      type: Reflect.getMetadata("design:paramtypes", target, propertyKey)[parameterIndex],
      decoratorType: "cookies",
    };
    Reflect.defineMetadata(NailyWebWatermark.PARAM, oldMetadata, target, propertyKey);
  };
}

export function Ip(): ParameterDecorator;
export function Ip() {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const oldMetadata: NailyMapper.ParamMapper[] = Reflect.getMetadata(NailyWebWatermark.PARAM, target, propertyKey) || [];

    oldMetadata[parameterIndex] = {
      type: Reflect.getMetadata("design:paramtypes", target, propertyKey)[parameterIndex],
      decoratorType: "ip",
    };
    Reflect.defineMetadata(NailyWebWatermark.PARAM, oldMetadata, target, propertyKey);
  };
}

export function Ips(): ParameterDecorator;
export function Ips() {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const oldMetadata: NailyMapper.ParamMapper[] = Reflect.getMetadata(NailyWebWatermark.PARAM, target, propertyKey) || [];

    oldMetadata[parameterIndex] = {
      type: Reflect.getMetadata("design:paramtypes", target, propertyKey)[parameterIndex],
      decoratorType: "ips",
    };
    Reflect.defineMetadata(NailyWebWatermark.PARAM, oldMetadata, target, propertyKey);
  };
}
