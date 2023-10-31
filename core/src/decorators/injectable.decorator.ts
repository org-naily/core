import "reflect-metadata";
import { Type } from "../typings/common.typing";
import { NailyIocWatermark } from "../constants/watermark.constant";

export function Injectable(): ClassDecorator;
export function Injectable() {
  return (target: Type) => {
    Reflect.defineMetadata(NailyIocWatermark.INJECTABLE, true, target);
  };
}
