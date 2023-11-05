import "reflect-metadata";
import { Type } from "@naily/core";
import { NailyLogWatermark } from "../constants";
import { DefaultLogger } from "../classes/default.logger";

export function UseLogger(logger: Type<DefaultLogger>) {
  return (target: Type) => {
    Reflect.defineMetadata(NailyLogWatermark.USE, logger, target);
  };
}
