import { Injectable, Type } from "@naily/core";
import { WEBWATERMARK } from "../constants/watermark.constant";

export function Controller(path = "/") {
  return (target: Type) => {
    Injectable()(target);
    Reflect.defineMetadata(WEBWATERMARK.CONTROLLER, path, target);
  };
}
