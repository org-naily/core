import { Autowired, Component, Injectable } from "@org-naily/core";
import { Controller, Get, NFilter, NPipe, Query, UseFilter } from "@org-naily/backend";
import { KoaFactory } from "@org-naily/backend-koa";

@Injectable()
export class TestService implements NPipe, NFilter {
  getHello() {
    return "hello world";
  }

  transform(value: any, host: NPipe.Host) {
    console.log("pipe");
    return value;
  }

  catch(error: Error, host: NFilter.Host): void | Promise<void> {
    console.log("error");
    host.getResponse().send(error.message);
  }

  beforeExecute(host: NFilter.Host): void | Promise<void> {
    console.log("before");
  }

  afterExecute(host: NFilter.Host): void | Promise<void> {
    console.log("after");
  }

  finallyExecute(host: NFilter.Host): void | Promise<void> {
    console.log("finally");
  }
}

@Controller()
export class AppController {
  @Autowired
  private readonly testService: TestService;

  @Get()
  @UseFilter(TestService)
  public getHello(@Query("name", TestService) name: string) {
    console.log("controller");
    return "Hello world";
  }
}

@Component({
  Providers: [TestService],
  Exports: [TestService],
})
export class AppComponent {}

@Component({
  Imports: [AppComponent],
  Providers: [AppController],
})
export class TestComponent {}

new KoaFactory().listen((port) => {
  console.log(`Server is running on http://localhost:${port}`);
});
