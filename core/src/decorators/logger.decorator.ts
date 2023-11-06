import { Type } from "../typings";
import { NailyLogWatermark } from "../constants";
import { Logger } from "../classes/logger.class";

export function UseLogger(logger: Type<Logger>) {
  return (target: Type) => {
    Reflect.defineMetadata(NailyLogWatermark.USE, logger, target);
  };
}
