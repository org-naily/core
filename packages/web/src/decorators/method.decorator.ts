import "reflect-metadata";
import { NailyWebWatermark } from "../constants";
import { IMethod } from "../typings/method.typing";

export function Get(path: string = "/") {
  return (target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<Function>) => {
    const oldMethod: IMethod[] = Reflect.getMetadata(NailyWebWatermark.METHOD, target, propertyKey) || [];
    Reflect.defineMetadata(NailyWebWatermark.METHOD, [...oldMethod, { path, method: "get" }], target, propertyKey);
  };
}

export function Post(path: string = "/") {
  return (target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<Function>) => {
    const oldMethod: IMethod[] = Reflect.getMetadata(NailyWebWatermark.METHOD, target, propertyKey) || [];
    Reflect.defineMetadata(NailyWebWatermark.METHOD, [...oldMethod, { path, method: "post" }], target, propertyKey);
  };
}

export function Put(path: string = "/") {
  return (target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<Function>) => {
    const oldMethod: IMethod[] = Reflect.getMetadata(NailyWebWatermark.METHOD, target, propertyKey) || [];
    Reflect.defineMetadata(NailyWebWatermark.METHOD, [...oldMethod, { path, method: "put" }], target, propertyKey);
  };
}

export function Patch(path: string = "/") {
  return (target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<Function>) => {
    const oldMethod: IMethod[] = Reflect.getMetadata(NailyWebWatermark.METHOD, target, propertyKey) || [];
    Reflect.defineMetadata(NailyWebWatermark.METHOD, [...oldMethod, { path, method: "patch" }], target, propertyKey);
  };
}

export function Delete(path: string = "/") {
  return (target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<Function>) => {
    const oldMethod: IMethod[] = Reflect.getMetadata(NailyWebWatermark.METHOD, target, propertyKey) || [];
    Reflect.defineMetadata(NailyWebWatermark.METHOD, [...oldMethod, { path, method: "delete" }], target, propertyKey);
  };
}

export function Options(path: string = "/") {
  return (target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<Function>) => {
    const oldMethod: IMethod[] = Reflect.getMetadata(NailyWebWatermark.METHOD, target, propertyKey) || [];
    Reflect.defineMetadata(NailyWebWatermark.METHOD, [...oldMethod, { path, method: "options" }], target, propertyKey);
  };
}

export function Head(path: string = "/") {
  return (target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<Function>) => {
    const oldMethod: IMethod[] = Reflect.getMetadata(NailyWebWatermark.METHOD, target, propertyKey) || [];
    Reflect.defineMetadata(NailyWebWatermark.METHOD, [...oldMethod, { path, method: "head" }], target, propertyKey);
  };
}

export function All(path: string = "/") {
  return (target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<Function>) => {
    const oldMethod: IMethod[] = Reflect.getMetadata(NailyWebWatermark.METHOD, target, propertyKey) || [];
    Reflect.defineMetadata(NailyWebWatermark.METHOD, [...oldMethod, { path, method: "all" }], target, propertyKey);
  };
}

export function Trace(method: string, path: string = "/") {
  return (target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<Function>) => {
    if (!method) throw new Error("Method is not defined");
    const oldMethod: IMethod[] = Reflect.getMetadata(NailyWebWatermark.METHOD, target, propertyKey) || [];
    Reflect.defineMetadata(NailyWebWatermark.METHOD, [...oldMethod, { path, method: "trace" }], target, propertyKey);
  };
}
