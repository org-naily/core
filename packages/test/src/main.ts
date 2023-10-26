import { Autowired, Injectable } from "@naily/core";
import { Controller, Get, Req, createNailyWebApplication } from "@naily/web";
import { ExpressAdapter } from "@naily/web-express";
import { Request } from "express";

@Injectable()
export class TestService {}

@Controller()
export class MainController {
  @Autowired
  private readonly testService: TestService;

  @Get()
  public getHello(@Req() req: Request) {
    return "hello world";
  }
}

createNailyWebApplication(new ExpressAdapter()).listen(3000, (port) => {
  console.log(`Listening on port http://localhost:${port}`);
});
