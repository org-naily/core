import "reflect-metadata";
import { NailyBaseFactory } from "../core";
import { Type } from "../typings/common.typing";
import { NailyIOCWatermark } from "../constants/watermark.constant";

export function Injectable(token: string = NailyBaseFactory.generateToken()) {
  return (target: Type) => {};
}
