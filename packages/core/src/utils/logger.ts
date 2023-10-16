import { getLogger, configure, Configuration } from "log4js";

export class Logger {
  protected logger = getLogger(this.context);
  protected options: Configuration = {
    appenders: {
      files: {
        type: "dateFile",
        filename: "log/access",
        pattern: "yyyy.MM.dd.log",
        alwaysIncludePattern: true,
      },
      out: {
        type: "stdout",
        layout: {
          type: "colored",
        },
      },
    },
    categories: {
      default: {
        appenders: ["files", "out"],
        level: "all",
      },
    },
  };

  constructor(private readonly context = "NAILY") {
    this.logger.level = "all";
    configure(this.options);
  }

  public log(message: string, ...args: any[]) {
    this.logger.log(message, ...args);
  }

  public info(message: string, ...args: any[]) {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: any[]) {
    this.logger.warn(message, ...args);
  }

  public error(message: string, ...args: any[]) {
    this.logger.error(message, ...args);
  }

  public debug(message: string, ...args: any[]) {
    this.logger.debug(message, ...args);
  }

  public trace(message: string, ...args: any[]) {
    this.logger.trace(message, ...args);
  }

  public fatal(message: string, ...args: any[]) {
    this.logger.fatal(message, ...args);
  }
}
