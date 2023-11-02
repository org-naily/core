import { Type } from "@naily/core";
import { NailyWebWatermark } from "../constants/warermark.constant";
import { NPipe } from "../typings";

export function Params(key?: string, ...pipes: Type<NPipe>[]): ParameterDecorator;
export function Params(...pipes: Type<NPipe>[]): ParameterDecorator;
export function Params(...args: [string | Type<NPipe>, ...Type<NPipe>[]]) {
  return (target: Object, propertyKey: string, index: number) => {
    const oldParams: NPipe.Meta.HavePipeParameterOptions[] = Reflect.getMetadata(NailyWebWatermark.PARAMETERS, target, propertyKey) || [];
    oldParams[index] = {
      type: "params",
      key: args[0] && typeof args[0] === "string" ? args[0] : undefined,
      pipes: args.filter((pipe, index) => {
        if (index === 0 && typeof pipe === "string") return undefined;
        return pipe;
      }) as Type<NPipe>[],
      index,
    };
    Reflect.defineMetadata(NailyWebWatermark.PARAMETERS, oldParams, target, propertyKey);
  };
}

export function Query(key?: string, ...pipes: Type<NPipe>[]): ParameterDecorator;
export function Query(...pipes: Type<NPipe>[]): ParameterDecorator;
export function Query(...args: [string | Type<NPipe>, ...Type<NPipe>[]]) {
  return (target: Object, propertyKey: string, index: number) => {
    const oldParams: NPipe.Meta.HavePipeParameterOptions[] = Reflect.getMetadata(NailyWebWatermark.PARAMETERS, target, propertyKey) || [];
    oldParams[index] = {
      type: "query",
      key: args[0] && typeof args[0] === "string" ? args[0] : undefined,
      pipes: args.filter((pipe, index) => {
        if (index === 0 && typeof pipe === "string") return undefined;
        return pipe;
      }) as Type<NPipe>[],
      index,
    };
    Reflect.defineMetadata(NailyWebWatermark.PARAMETERS, oldParams, target, propertyKey);
  };
}

export function Body(key?: string, ...pipes: Type<NPipe>[]): ParameterDecorator;
export function Body(...pipes: Type<NPipe>[]): ParameterDecorator;
export function Body(...args: [string | Type<NPipe>, ...Type<NPipe>[]]) {
  return (target: Object, propertyKey: string, index: number) => {
    const oldParams: NPipe.Meta.HavePipeParameterOptions[] = Reflect.getMetadata(NailyWebWatermark.PARAMETERS, target, propertyKey) || [];
    oldParams[index] = {
      type: "body",
      key: args[0] && typeof args[0] === "string" ? args[0] : undefined,
      pipes: args.filter((pipe, index) => {
        if (index === 0 && typeof pipe === "string") return undefined;
        return pipe;
      }) as Type<NPipe>[],
      index,
    };
    Reflect.defineMetadata(NailyWebWatermark.PARAMETERS, oldParams, target, propertyKey);
  };
}

export function Headers(key?: string) {
  return (target: Object, propertyKey: string, index: number) => {
    const oldParams: NPipe.Meta.ParameterOptions[] = Reflect.getMetadata(NailyWebWatermark.PARAMETERS, target, propertyKey) || [];
    oldParams[index] = { type: "headers", key, index };
    Reflect.defineMetadata(NailyWebWatermark.PARAMETERS, oldParams, target, propertyKey);
  };
}

export function Cookies() {
  return (target: Object, propertyKey: string, index: number) => {
    const oldParams: NPipe.Meta.ParameterOptions[] = Reflect.getMetadata(NailyWebWatermark.PARAMETERS, target, propertyKey) || [];
    oldParams[index] = { type: "cookies", index };
    Reflect.defineMetadata(NailyWebWatermark.PARAMETERS, oldParams, target, propertyKey);
  };
}

export function Ip() {
  return (target: Object, propertyKey: string, index: number) => {
    const oldParams: NPipe.Meta.ParameterOptions[] = Reflect.getMetadata(NailyWebWatermark.PARAMETERS, target, propertyKey) || [];
    oldParams[index] = { type: "ip", index };
    Reflect.defineMetadata(NailyWebWatermark.PARAMETERS, oldParams, target, propertyKey);
  };
}

export function Ips() {
  return (target: Object, propertyKey: string, index: number) => {
    const oldParams: NPipe.Meta.ParameterOptions[] = Reflect.getMetadata(NailyWebWatermark.PARAMETERS, target, propertyKey) || [];
    oldParams[index] = { type: "ips", index };
    Reflect.defineMetadata(NailyWebWatermark.PARAMETERS, oldParams, target, propertyKey);
  };
}

export function Req() {
  return (target: Object, propertyKey: string, index: number) => {
    const oldParams: NPipe.Meta.ParameterOptions[] = Reflect.getMetadata(NailyWebWatermark.PARAMETERS, target, propertyKey) || [];
    oldParams[index] = { type: "req", index };
    Reflect.defineMetadata(NailyWebWatermark.PARAMETERS, oldParams, target, propertyKey);
  };
}

export function Res() {
  return (target: Object, propertyKey: string, index: number) => {
    const oldParams: NPipe.Meta.ParameterOptions[] = Reflect.getMetadata(NailyWebWatermark.PARAMETERS, target, propertyKey) || [];
    oldParams[index] = { type: "res", index };
    Reflect.defineMetadata(NailyWebWatermark.PARAMETERS, oldParams, target, propertyKey);
  };
}

export function Next() {
  return (target: Object, propertyKey: string, index: number) => {
    const oldParams: NPipe.Meta.ParameterOptions[] = Reflect.getMetadata(NailyWebWatermark.PARAMETERS, target, propertyKey) || [];
    oldParams[index] = { type: "next", index };
    Reflect.defineMetadata(NailyWebWatermark.PARAMETERS, oldParams, target, propertyKey);
  };
}
