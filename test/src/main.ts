import { Autowired, Component, Injectable } from "@org-naily/core";
import { Catch, Controller, Get, NFilter, NPipe, Query, UseFilter } from "@org-naily/backend";
import { KoaFactory } from "@org-naily/backend-koa";
import Time from "koa-response-time";
import { Context } from "koa";

@Catch()
export class TestFilter implements NPipe, NFilter {
  getHello() {
    return "hello world";
  }

  transform(value: any, host: NPipe.Host) {
    console.log("pipe");
    return value;
  }

  catch(error: Error, host: NFilter.Host): void | Promise<void> {
    console.log("error");
    host.getContext<Context>().body = "error";
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
  private readonly testFilter: TestFilter;

  @Get()
  @UseFilter(TestFilter)
  public getHello(@Query("name", TestFilter) name: string) {
    return this.testFilter.getHello();
  }
}

@Component({
  Providers: [TestFilter],
  Exports: [TestFilter],
})
export class AppComponent {}

@Component({
  Imports: [AppComponent],
  Providers: [AppController],
})
export class TestComponent {}

new KoaFactory()
  .use(Time())
  .use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  })
  .listen((port) => {
    console.log(`Server is running on http://localhost:${port}`);
  });
