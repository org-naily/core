import { Injectable, Logger, Value } from "@naily/core";
import { Controller, Get, NailyExpWebFactory, NailyWebWatermark } from "@naily/web";
import { ExpressAdapter } from "@naily/web-express";

@Injectable()
export class MainService {
  @Value("1 + 1")
  readonly test: number;

  public getHello() {
    return "Hello World!";
  }
}

@Controller()
export class MainController {
  @Get()
  public getHello() {
    return "hello naily";
  }
}

NailyExpWebFactory.create(new ExpressAdapter()).listen(3999, (port) => {
  new Logger().verbose(`Server is running on http://localhost:${port}`);
});
