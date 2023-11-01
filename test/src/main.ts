import { Autowired, Class, NailyConfiguration, NailyFactory, Value } from "@naily/core";
import { NailyExpWebPlugin, Controller, Get } from "@naily/web";
import { ExpressAdapter } from "@naily/web-express";
import { json } from "express";

@Class()
export class TestPipe {
  getTest() {
    return "hello world";
  }
}

@Controller()
export class TestController {
  @Autowired
  private readonly testPipe: TestPipe;

  @Value("naily.port")
  private readonly port: number;

  @Get()
  public index() {
    return this.port;
  }
}

new NailyFactory().use(
  new NailyExpWebPlugin(new ExpressAdapter()).use(json()).listen(3000, (port) => {
    console.log(`Server is running on http://localhost:${port}`);
  })
);
