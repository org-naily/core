import { Autowired, Injectable, Logger, Value } from "@naily/core";
import { Catch, Controller, Get, NFilter, NPipe, NailyExpWebFactory, Param, UseFilters } from "@naily/web";
import { ExpressAdapter } from "@naily/web-express";
import { Response } from "express";

@Injectable()
export class MainService implements NPipe {
  @Value("1 + 1")
  readonly test: number;

  transform(value: any, metadata: NPipe.Metadata) {
    console.log(value);
    console.log(metadata);
    throw new Error(`aaa`);
  }

  public getHello() {
    return "Hello World!";
  }
}

@Catch(Error)
export class MainFilter implements NFilter {
  catch(error: Error, host: NFilter.ArgumentHost): void | Promise<void> {
    host.getResponse<Response>().send(error.message);
  }
}

@Controller()
export class MainController {
  @Autowired
  private readonly mainService: MainService;

  @Get(":id")
  @UseFilters(MainFilter)
  public getHello(@Param("id", MainService) param: number) {
    return this.mainService.getHello();
  }
}

NailyExpWebFactory.create(new ExpressAdapter()).listen(3999, (port) => {
  new Logger().verbose(`Server is running on http://localhost:${port}`);
});
