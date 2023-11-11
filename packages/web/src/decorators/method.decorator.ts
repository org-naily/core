import { NailyWebWatermark } from "@/constants";
import { NWeb } from "@/typings/common.typing";

export function Get(path: string = "/") {
  return (target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<(...args: any) => any>) => {
    const oldMethod: NWeb.NMethodMetadata[] = Reflect.getMetadata(NailyWebWatermark.CONTROLLER_METHOD, target, propertyKey) || [];
    oldMethod.push({
      method: "get",
      path,
    });
    Reflect.defineMetadata(NailyWebWatermark.CONTROLLER_METHOD, oldMethod, target, propertyKey);
  };
}

export function Post(path: string = "/") {
  return (target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<(...args: any) => any>) => {
    const oldMethod: NWeb.NMethodMetadata[] = Reflect.getMetadata(NailyWebWatermark.CONTROLLER_METHOD, target, propertyKey) || [];
    oldMethod.push({
      method: "post",
      path,
    });
    Reflect.defineMetadata(NailyWebWatermark.CONTROLLER_METHOD, oldMethod, target, propertyKey);
  };
}

export function Put(path: string = "/") {
  return (target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<(...args: any) => any>) => {
    const oldMethod: NWeb.NMethodMetadata[] = Reflect.getMetadata(NailyWebWatermark.CONTROLLER_METHOD, target, propertyKey) || [];
    oldMethod.push({
      method: "put",
      path,
    });
    Reflect.defineMetadata(NailyWebWatermark.CONTROLLER_METHOD, oldMethod, target, propertyKey);
  };
}

export function Delete(path: string = "/") {
  return (target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<(...args: any) => any>) => {
    const oldMethod: NWeb.NMethodMetadata[] = Reflect.getMetadata(NailyWebWatermark.CONTROLLER_METHOD, target, propertyKey) || [];
    oldMethod.push({
      method: "delete",
      path,
    });
    Reflect.defineMetadata(NailyWebWatermark.CONTROLLER_METHOD, oldMethod, target, propertyKey);
  };
}

export function Patch(path: string = "/") {
  return (target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<(...args: any) => any>) => {
    const oldMethod: NWeb.NMethodMetadata[] = Reflect.getMetadata(NailyWebWatermark.CONTROLLER_METHOD, target, propertyKey) || [];
    oldMethod.push({
      method: "patch",
      path,
    });
    Reflect.defineMetadata(NailyWebWatermark.CONTROLLER_METHOD, oldMethod, target, propertyKey);
  };
}

export function Options(path: string = "/") {
  return (target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<(...args: any) => any>) => {
    const oldMethod: NWeb.NMethodMetadata[] = Reflect.getMetadata(NailyWebWatermark.CONTROLLER_METHOD, target, propertyKey) || [];
    oldMethod.push({
      method: "options",
      path,
    });
    Reflect.defineMetadata(NailyWebWatermark.CONTROLLER_METHOD, oldMethod, target, propertyKey);
  };
}

export function Head(path: string = "/") {
  return (target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<(...args: any) => any>) => {
    const oldMethod: NWeb.NMethodMetadata[] = Reflect.getMetadata(NailyWebWatermark.CONTROLLER_METHOD, target, propertyKey) || [];
    oldMethod.push({
      method: "head",
      path,
    });
    Reflect.defineMetadata(NailyWebWatermark.CONTROLLER_METHOD, oldMethod, target, propertyKey);
  };
}

export function All(path: string = "/") {
  return (target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<(...args: any) => any>) => {
    const oldMethod: NWeb.NMethodMetadata[] = Reflect.getMetadata(NailyWebWatermark.CONTROLLER_METHOD, target, propertyKey) || [];
    oldMethod.push({
      method: "all",
      path,
    });
    Reflect.defineMetadata(NailyWebWatermark.CONTROLLER_METHOD, oldMethod, target, propertyKey);
  };
}

export function Trace(path: string = "/") {
  return (target: Object, propertyKey: string | symbol, _descriptor: TypedPropertyDescriptor<(...args: any) => any>) => {
    const oldMethod: NWeb.NMethodMetadata[] = Reflect.getMetadata(NailyWebWatermark.CONTROLLER_METHOD, target, propertyKey) || [];
    oldMethod.push({
      method: "trace",
      path,
    });
    Reflect.defineMetadata(NailyWebWatermark.CONTROLLER_METHOD, oldMethod, target, propertyKey);
  };
}
