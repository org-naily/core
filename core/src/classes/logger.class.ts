import { NailyLogWatermark } from "../constants";
import chalk from "chalk";
import { Type } from "../typings";
import { Injectable } from "../decorators";

@Injectable()
export class Logger {
  private readonly logger: Type<Logger>;

  constructor(private readonly target?: Type) {
    if (!target) return;
    const overrideLogger: Type<Logger> = Reflect.getMetadata(NailyLogWatermark.USE, target);
    if (overrideLogger) this.logger = overrideLogger;
  }

  log(message: string, category: string = "Naily") {
    if (this.logger) {
      const logger = new this.logger();
      logger.log(message, category);
    } else {
      console.log(chalk.green(`[${new Date().toLocaleString()}] LOG ${category} - ${message}`));
    }
    return this;
  }

  error(message: string, category: string = "Naily") {
    if (this.logger) {
      const logger = new this.logger();
      logger.error(message, category);
    } else {
      console.error(chalk.red(`[${new Date().toLocaleString()}] ERROR ${category} - ${message}`));
    }
    return this;
  }

  warn(message: string, category: string = "Naily") {
    if (this.logger) {
      const logger = new this.logger();
      logger.warn(message, category);
    } else {
      console.warn(chalk.yellow(`[${new Date().toLocaleString()}] WARN ${category} - ${message}`));
    }
    return this;
  }

  debug(message: string, category: string = "Naily") {
    if (this.logger) {
      const logger = new this.logger();
      logger.debug(message, category);
    } else {
      console.debug(chalk.green(`[${new Date().toLocaleString()}] DEBUG ${category} - ${message}`));
    }
    return this;
  }

  verbose(message: string, category: string = "Naily") {
    if (this.logger) {
      const logger = new this.logger();
      logger.verbose(message, category);
    } else {
      console.log(chalk.magenta(`[${new Date().toLocaleString()}] VERBOSE ${category} - ${message}`));
    }
    return this;
  }
}
