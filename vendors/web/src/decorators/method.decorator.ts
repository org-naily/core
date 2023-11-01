import { NailyWebWatermark } from "../constants/warermark.constant";

export function Get(path: string = "/") {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(NailyWebWatermark.GET, path, target, propertyKey);
  };
}

export function Post(path: string = "/") {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(NailyWebWatermark.POST, path, target, propertyKey);
  };
}

export function Put(path: string = "/") {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(NailyWebWatermark.PUT, path, target, propertyKey);
  };
}

export function Delete(path: string = "/") {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(NailyWebWatermark.DELETE, path, target, propertyKey);
  };
}

export function Patch(path: string = "/") {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(NailyWebWatermark.PATCH, path, target, propertyKey);
  };
}

export function Options(path: string = "/") {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(NailyWebWatermark.OPTIONS, path, target, propertyKey);
  };
}

export function Head(path: string = "/") {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(NailyWebWatermark.HEAD, path, target, propertyKey);
  };
}

export function All(path: string = "/") {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(NailyWebWatermark.ALL, path, target, propertyKey);
  };
}

export function Trace(path: string = "/") {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(NailyWebWatermark.TRACE, path, target, propertyKey);
  };
}
