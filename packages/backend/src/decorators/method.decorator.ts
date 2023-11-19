import { NailyMapper } from "@/typings";
import { NailyWebWatermark } from "@/constants";

export function Get(path?: string): MethodDecorator;
export function Get(path: string = "/") {
  return (target: Object, propertyKey: string | symbol) => {
    const httpMethods: NailyMapper.MethodMapper[] = Reflect.getMetadata(NailyWebWatermark.METHOD, target, propertyKey) || [];
    httpMethods.push({
      method: "get",
      path,
    });
    Reflect.defineMetadata(NailyWebWatermark.METHOD, httpMethods, target, propertyKey);
  };
}

export function Post(path?: string): MethodDecorator;
export function Post(path: string = "/") {
  return (target: Object, propertyKey: string | symbol) => {
    const httpMethods: NailyMapper.MethodMapper[] = Reflect.getMetadata(NailyWebWatermark.METHOD, target, propertyKey) || [];
    httpMethods.push({
      method: "post",
      path,
    });
    Reflect.defineMetadata(NailyWebWatermark.METHOD, httpMethods, target, propertyKey);
  };
}

export function Put(path?: string): MethodDecorator;
export function Put(path: string = "/") {
  return (target: Object, propertyKey: string | symbol) => {
    const httpMethods: NailyMapper.MethodMapper[] = Reflect.getMetadata(NailyWebWatermark.METHOD, target, propertyKey) || [];
    httpMethods.push({
      method: "put",
      path,
    });
    Reflect.defineMetadata(NailyWebWatermark.METHOD, httpMethods, target, propertyKey);
  };
}

export function Delete(path?: string): MethodDecorator;
export function Delete(path: string = "/") {
  return (target: Object, propertyKey: string | symbol) => {
    const httpMethods: NailyMapper.MethodMapper[] = Reflect.getMetadata(NailyWebWatermark.METHOD, target, propertyKey) || [];
    httpMethods.push({
      method: "delete",
      path,
    });
    Reflect.defineMetadata(NailyWebWatermark.METHOD, httpMethods, target, propertyKey);
  };
}

export function Patch(path?: string): MethodDecorator;
export function Patch(path: string = "/") {
  return (target: Object, propertyKey: string | symbol) => {
    const httpMethods: NailyMapper.MethodMapper[] = Reflect.getMetadata(NailyWebWatermark.METHOD, target, propertyKey) || [];
    httpMethods.push({
      method: "patch",
      path,
    });
    Reflect.defineMetadata(NailyWebWatermark.METHOD, httpMethods, target, propertyKey);
  };
}

export function Options(path?: string): MethodDecorator;
export function Options(path: string = "/") {
  return (target: Object, propertyKey: string | symbol) => {
    const httpMethods: NailyMapper.MethodMapper[] = Reflect.getMetadata(NailyWebWatermark.METHOD, target, propertyKey) || [];
    httpMethods.push({
      method: "options",
      path,
    });
    Reflect.defineMetadata(NailyWebWatermark.METHOD, httpMethods, target, propertyKey);
  };
}

export function Head(path?: string): MethodDecorator;
export function Head(path: string = "/") {
  return (target: Object, propertyKey: string | symbol) => {
    const httpMethods: NailyMapper.MethodMapper[] = Reflect.getMetadata(NailyWebWatermark.METHOD, target, propertyKey) || [];
    httpMethods.push({
      method: "head",
      path,
    });
    Reflect.defineMetadata(NailyWebWatermark.METHOD, httpMethods, target, propertyKey);
  };
}

export function All(path?: string): MethodDecorator;
export function All(path: string = "/") {
  return (target: Object, propertyKey: string | symbol) => {
    const httpMethods: NailyMapper.MethodMapper[] = Reflect.getMetadata(NailyWebWatermark.METHOD, target, propertyKey) || [];
    httpMethods.push({
      method: "all",
      path,
    });
    Reflect.defineMetadata(NailyWebWatermark.METHOD, httpMethods, target, propertyKey);
  };
}

export function Trace(path?: string): MethodDecorator;
export function Trace(path: string = "/") {
  return (target: Object, propertyKey: string | symbol) => {
    const httpMethods: NailyMapper.MethodMapper[] = Reflect.getMetadata(NailyWebWatermark.METHOD, target, propertyKey) || [];
    httpMethods.push({
      method: "trace",
      path,
    });
    Reflect.defineMetadata(NailyWebWatermark.METHOD, httpMethods, target, propertyKey);
  };
}
