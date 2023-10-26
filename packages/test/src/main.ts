import { Autowired, Injectable } from "@naily/core";
import { Controller, Get, createNailyWebApplication } from "@naily/web";
import { ExpressAdapter } from "@naily/web-express";

@Injectable()
export class TestService {}

@Controller()
export class MainController {
  @Autowired
  private readonly testService: TestService;

  @Get()
  public getHello() {
    return "hello world";
  }
}

createNailyWebApplication(new ExpressAdapter()).listen(3000, (port) => {
  console.log(`Listening on port http://localhost:${port}`);
});
