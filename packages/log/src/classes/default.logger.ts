import { Type } from "@naily/core";
import { NailyLogWatermark } from "../constants";

export class DefaultLogger {
  private readonly logger: Type<DefaultLogger>;

  constructor(private readonly target?: Type) {
    if (!target) return;
    const overrideLogger: Type<DefaultLogger> = Reflect.getMetadata(NailyLogWatermark.USE, target);
    if (overrideLogger) this.logger = overrideLogger;
  }

  log(message: string) {
    if (this.logger) {
      const logger = new this.logger();
      logger.log(message);
    } else {
      console.log(message);
    }
  }

  error(message: string) {
    if (this.logger) {
      const logger = new this.logger();
      logger.error(message);
    } else {
      console.error(message);
    }
  }

  warn(message: string) {
    if (this.logger) {
      const logger = new this.logger();
      logger.warn(message);
    } else {
      console.warn(message);
    }
  }

  debug(message: string) {
    if (this.logger) {
      const logger = new this.logger();
      logger.debug(message);
    } else {
      console.debug(message);
    }
  }

  verbose(message: string) {
    if (this.logger) {
      const logger = new this.logger();
      logger.verbose(message);
    } else {
      console.log(message);
    }
  }
}
