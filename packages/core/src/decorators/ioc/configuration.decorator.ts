import { WATERMARK } from "../../constants/watermark.constant";
import { RxType } from "../../typings";
import { Injectable } from "./injectable.decorator";

export function Configuration(target: RxType) {
  Injectable()(target);
  Reflect.defineMetadata(WATERMARK.CONFIGURATION, true, target);
}
