import { Autowired, Injectable, Logger, Value } from "@naily/core";
import { Catch, Controller, Get, NFilter, NPipe, NailyExpWebFactory, Param, UseFilters } from "@naily/web";
import { ExpressAdapter } from "@naily/web-express";
import { Response, json, urlencoded } from "express";
import { Server } from "http";

export class TestError extends Error {
  constructor(msg: string, readonly twd: string) {
    super(msg);
    console.log(twd);
  }
}

@Injectable()
export class MainService implements NPipe {
  @Value("port")
  readonly test: string;

  transform(value: any, metadata: NPipe.Metadata) {
    console.log(value);
    console.log(metadata);
    throw new TestError(this.test, "AAA");
  }

  public getHello() {
    return "Hello World!";
  }
}

@Catch(TestError)
export class MainFilter implements NFilter {
  catch(error: TestError, host: NFilter.ArgumentHost): void | Promise<void> {
    host.getResponse<Response>().send(error.twd);
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

NailyExpWebFactory.create(new ExpressAdapter())
  .useMiddleware(json())
  .useMiddleware(urlencoded({ extended: true }))
  .listen<Server>(3999, (port) => {
    new Logger().verbose(`Server is running on http://localhost:${port}`);
  });
