import { HttpMethod } from "../constants/method.constant";

export function Get(path: string = "/") {
  return <T>(target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<T>): void => {
    Reflect.defineMetadata(HttpMethod.GET, path, target, propertyKey);
  };
}

export function Post(path: string = "/") {
  return <T>(target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<T>): void => {
    Reflect.defineMetadata(HttpMethod.POST, path, target, propertyKey);
  };
}

export function Put(path: string = "/") {
  return <T>(target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<T>): void => {
    Reflect.defineMetadata(HttpMethod.PUT, path, target, propertyKey);
  };
}

export function Delete(path: string = "/") {
  return <T>(target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<T>): void => {
    Reflect.defineMetadata(HttpMethod.DELETE, path, target, propertyKey);
  };
}

export function Patch(path: string = "/") {
  return <T>(target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<T>): void => {
    Reflect.defineMetadata(HttpMethod.PATCH, path, target, propertyKey);
  };
}

export function Options(path: string = "/") {
  return <T>(target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<T>): void => {
    Reflect.defineMetadata(HttpMethod.OPTIONS, path, target, propertyKey);
  };
}

export function Head(path: string = "/") {
  return <T>(target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<T>): void => {
    Reflect.defineMetadata(HttpMethod.HEAD, path, target, propertyKey);
  };
}

export function All(path: string = "/") {
  return <T>(target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<T>): void => {
    Reflect.defineMetadata(HttpMethod.ALL, path, target, propertyKey);
  };
}

export function Trace(path: string = "/") {
  return <T>(target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<T>): void => {
    Reflect.defineMetadata(HttpMethod.TRACE, path, target, propertyKey);
  };
}
