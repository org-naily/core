import { Injectable, NLifeCycle, NailyInjectableFactory, Value } from "@naily/core";

@Injectable()
export class AppService implements NLifeCycle {
  @Value("port")
  private readonly test: number;

  constructor() {
    console.log(this.test);
  }

  public getHello(): string {
    return "Hello World!";
  }
}

@Injectable()
export class TestService {
  constructor(private readonly appService: AppService) {
    console.log(this.appService.getHello());
  }
}

new NailyInjectableFactory(TestService).create();
