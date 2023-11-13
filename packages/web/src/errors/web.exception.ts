import { LoggerService, NailyLogger } from "@naily/core";

export class NailyWebException extends Error {
  constructor(message: string, logger: LoggerService = new NailyLogger()) {
    super(message);
    this.name = "NailyWebException";
    if (logger) logger.error(message);
  }
}
