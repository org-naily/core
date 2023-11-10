import { Injectable, NailyInjectableFactory, Value } from "@naily/core";

@Injectable()
export class AppService {
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
  @Value("port")
  private readonly test: number;

  constructor(private readonly appService: AppService) {
    console.log(this.appService.getHello());
  }
}

new NailyInjectableFactory(TestService).create();
