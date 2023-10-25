import { Injectable, Type } from "@naily/core";
import { NailyWebConstant } from "../constants";
import { NailyWebFactoryRepository } from "../factories";

export function Controller(path: string = "/") {
  return (target: Type) => {
    const oldPath = Reflect.getMetadata(NailyWebConstant.CONTROLLER, target);
    if (oldPath) throw new Error(`@Controller only can be used once, please check ${target.name}.`);

    Injectable()(target);
    Reflect.defineMetadata(NailyWebConstant.CONTROLLER, path, target);
    new NailyWebFactoryRepository().getContext().add(target);
  };
}

export function Gateway(namespace: string = "/") {
  return (target: Type) => {
    const oldPath = Reflect.getMetadata(NailyWebConstant.GATEWAY, target);
    if (oldPath) throw new Error(`@Gateway only can be used once, please check ${target.name}.`);

    Injectable()(target);
    Reflect.defineMetadata(NailyWebConstant.GATEWAY, namespace, target);
    new NailyWebFactoryRepository().getContext().add(target);
  };
}
