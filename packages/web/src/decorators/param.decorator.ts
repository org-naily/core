import { Type } from "@naily/core";
import { NPipe } from "../typings";
import { NailyWebWatermark } from "../constants";

export function Param(...pipes: Type<NPipe>[]): ParameterDecorator;
export function Param(key: string, ...pipes: Type<NPipe>[]): ParameterDecorator;
export function Param(...args: any[]) {
  return (target: Object, propertyKey: string | symbol, index: number) => {
    const metadata: NPipe.PipeMetadata[] = Reflect.getMetadata(NailyWebWatermark.PARAMETER, target, propertyKey) || [];
    metadata[index] = {
      user: "param",
      key: args[0] && typeof args[0] === "string" ? args[0] : undefined,
      pipes: args[0] && typeof args[0] === "string" ? args.slice(1) : args,
    };
    Reflect.defineMetadata(NailyWebWatermark.PARAMETER, metadata, target, propertyKey);
  };
}

export function Query(...pipes: Type<NPipe>[]): ParameterDecorator;
export function Query(key: string, ...pipes: Type<NPipe>[]): ParameterDecorator;
export function Query(...args: any[]) {
  return (target: Object, propertyKey: string | symbol, index: number) => {
    const metadata: NPipe.PipeMetadata[] = Reflect.getMetadata(NailyWebWatermark.PARAMETER, target, propertyKey) || [];
    metadata[index] = {
      user: "query",
      key: args[0] && typeof args[0] === "string" ? args[0] : undefined,
      pipes: args[0] && typeof args[0] === "string" ? args.slice(1) : args,
    };
    Reflect.defineMetadata(NailyWebWatermark.PARAMETER, metadata, target, propertyKey);
  };
}

export function Body(...pipes: Type<NPipe>[]): ParameterDecorator;
export function Body(key: string, ...pipes: Type<NPipe>[]): ParameterDecorator;
export function Body(...args: any[]) {
  return (target: Object, propertyKey: string | symbol, index: number) => {
    const metadata: NPipe.PipeMetadata[] = Reflect.getMetadata(NailyWebWatermark.PARAMETER, target, propertyKey) || [];
    metadata[index] = {
      user: "body",
      key: args[0] && typeof args[0] === "string" ? args[0] : undefined,
      pipes: args[0] && typeof args[0] === "string" ? args.slice(1) : args,
    };
    Reflect.defineMetadata(NailyWebWatermark.PARAMETER, metadata, target, propertyKey);
  };
}
