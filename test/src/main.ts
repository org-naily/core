import { Autowired, Injectable } from "@naily/core";
import { Catch, Controller, Get, Ip, NFilter, NPipe, Query, UseFilter } from "@naily/backend";
import { ExpressFactory } from "@naily/backend-express";

class TestError extends Error {
  message: string = "TestError Throwed!";
}

@Injectable()
@Catch(TestError)
export class TestService implements NPipe, NFilter {
  getHello() {
    return "hello world";
  }

  transform(value: any, host: NPipe.Host) {}

  catch(error: TestError, host: NFilter.Host): void | Promise<void> {
    host.getResponse().send(error.message);
  }
}

@Controller()
export class AppController {
  @Autowired
  private readonly testService: TestService;

  @Get()
  @UseFilter(TestService)
  public getHello(@Query("name", TestService) name: string) {
    throw new TestError("Method not implemented.");
  }
}

new ExpressFactory().listen((port) => {
  console.log(`Server is running on http://localhost:${port}`);
});
