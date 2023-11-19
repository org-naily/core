import { Autowired, Injectable } from "@naily/core";
import { Controller, Get, Ip } from "@naily/backend";
import { ExpressFactory } from "@naily/backend-express";

@Injectable()
export class TestService {
  getHello() {
    return "hello world";
  }
}

@Controller()
export class AppController {
  @Autowired
  private readonly testService: TestService;

  @Get()
  public test(@Ip() ip: string) {}

  @Get()
  public getHello() {
    return this.testService.getHello();
  }
}

new ExpressFactory().listen((port) => {
  console.log(`Server is running on http://localhost:${port}`);
});
