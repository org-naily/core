import { getLogger } from "log4js";

export class Logger {
  private readonly logger = getLogger(this.context);

  constructor(private readonly context = "NAILY") {
    this.logger.level = "all";
  }

  log(message: string) {
    this.logger.log(message);
  }

  info(message: string) {
    this.logger.info(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  trace(message: string) {
    this.logger.trace(message);
  }

  fatal(message: string) {
    this.logger.fatal(message);
  }

  level(level: string) {
    this.logger.level = level;
  }
}
