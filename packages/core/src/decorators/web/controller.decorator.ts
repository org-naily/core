import { WATERMARK } from "../../constants/watermark.constant";
import { Type } from "../../typings";
import { Injectable } from "../ioc/injectable.decorator";

export function Controller(path = "/") {
  return (target: Type) => {
    Injectable(target);
    Reflect.defineMetadata(WATERMARK.CONTROLLER, path, target);
  };
}
