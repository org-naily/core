import { Configuration, Injectable, NLifeCycle, Value } from "@naily/core";
import { ExpressAdapter } from "@naily/web-express";
import { NailyWebFactory, Controller, Get } from "@naily/web";

@Configuration()
export class AppConfiguration {}

@Injectable()
export class AppService implements NLifeCycle {
  public getHello(): number {
    return 100;
  }
}

@Controller()
export class AppController {
  @Value("naily.web.port")
  private readonly port: number;

  @Get()
  public async getHello() {
    return `Hello World! App is listening on ${this.port}`;
  }
}

NailyWebFactory.createExpApplication(new ExpressAdapter());
