import { Autowired, Injectable, Logger, Value } from "@naily/core";
import { Controller, Get, NPipe, NailyExpWebFactory, Param, Query } from "@naily/web";
import { ExpressAdapter } from "@naily/web-express";

@Injectable()
export class MainService implements NPipe {
  @Value("1 + 1")
  readonly test: number;

  transform(value: any, metadata: NPipe.Metadata) {
    console.log(value);
    console.log(metadata);
    throw new Error(`aaa`);
    return value;
  }

  public getHello() {
    return "Hello World!";
  }
}

@Controller()
export class MainController {
  @Autowired
  private readonly mainService: MainService;

  @Get(":id")
  public getHello(@Param("id", MainService) param: number) {
    return this.mainService.getHello();
  }
}

NailyExpWebFactory.create(new ExpressAdapter()).listen(3999, (port) => {
  new Logger().verbose(`Server is running on http://localhost:${port}`);
});
