import { WATERMARK } from "../constants/watermark.constant";

export function Get(path: string = "/") {
  return <T>(target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<T>): void => {
    Reflect.defineMetadata(WATERMARK.GET, path, target, propertyKey);
  };
}

export function Post(path: string = "/") {
  return <T>(target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<T>): void => {
    Reflect.defineMetadata(WATERMARK.POST, path, target, propertyKey);
  };
}

export function Put(path: string = "/") {
  return <T>(target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<T>): void => {
    Reflect.defineMetadata(WATERMARK.PUT, path, target, propertyKey);
  };
}

export function Delete(path: string = "/") {
  return <T>(target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<T>): void => {
    Reflect.defineMetadata(WATERMARK.DELETE, path, target, propertyKey);
  };
}

export function Patch(path: string = "/") {
  return <T>(target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<T>): void => {
    Reflect.defineMetadata(WATERMARK.PATCH, path, target, propertyKey);
  };
}

export function Options(path: string = "/") {
  return <T>(target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<T>): void => {
    Reflect.defineMetadata(WATERMARK.OPTIONS, path, target, propertyKey);
  };
}

export function Head(path: string = "/") {
  return <T>(target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<T>): void => {
    Reflect.defineMetadata(WATERMARK.HEAD, path, target, propertyKey);
  };
}

export function All(path: string = "/") {
  return <T>(target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<T>): void => {
    Reflect.defineMetadata(WATERMARK.ALL, path, target, propertyKey);
  };
}

export function Trace(path: string = "/") {
  return <T>(target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<T>): void => {
    Reflect.defineMetadata(WATERMARK.TRACE, path, target, propertyKey);
  };
}
