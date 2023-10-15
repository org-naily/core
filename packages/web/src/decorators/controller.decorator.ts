import { Injectable } from "@naily/core";
import { Type } from "@naily/core";
import { WATERMARK } from "../constants/watermark.constant";

export function Controller(path: string = "/") {
  if (path.length === 0) path = "/";
  return (target: Type) => {
    Injectable()(target);
    Reflect.defineMetadata(WATERMARK.CONTROLLER, path, target);
  };
}
