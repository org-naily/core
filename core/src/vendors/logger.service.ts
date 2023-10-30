import { configure } from "log4js";

export interface LoggerServiceImpl<Message extends any> {
  log(message: Message, context?: string): void;
  error(message: Message, context?: string): void;
  warn(message: Message, context?: string): void;
  info(message: Message, context?: string): void;
  fatal(message: Message, context?: string): void;
  trace(message: Message, context?: string): void;
  debug(message: Message, context?: string): void;
}

export class Logger<Message extends any> implements LoggerServiceImpl<Message> {
  protected readonly log4js = configure({
    categories: {
      default: {
        appenders: ["stdout", "file"],
        level: "all",
      },
      naily: {
        appenders: ["stdout", "file"],
        level: "all",
      },
    },
    appenders: {
      stdout: {
        type: "stdout",
        layout: {
          type: "coloured",
        },
      },
      file: {
        type: "dateFile",
        filename: "./logs/access",
        pattern: "yyyy.MM.dd.log",
        alwaysIncludePattern: true,
      },
    },
  });
  protected readonly logger = this.log4js.getLogger();

  constructor(private readonly category?: string, private readonly level?: string) {
    this.logger = category ? this.log4js.getLogger(category) : this.log4js.getLogger("Naily");
    this.logger.level = level ? level : "all";
  }

  log(message: Message, category?: string): void {
    this.logger.log(this.level, message);
  }

  error(message: Message, category?: string): void {
    this.logger.error(message);
  }

  warn(message: Message, category?: string): void {
    this.logger.warn(message);
  }

  info(message: Message, category?: string): void {
    this.logger.info(message);
  }

  fatal(message: Message, category?: string): void {
    this.logger.fatal(message);
  }

  trace(message: Message, category?: string): void {
    this.logger.trace(message);
  }

  debug(message: Message, category?: string): void {
    this.logger.debug(message);
  }
}
