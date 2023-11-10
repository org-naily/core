import { Autowired, Injectable, NLifeCycle, NailyInjectableFactory, Value } from "@naily/core";

@Injectable()
export class AppService implements NLifeCycle {
  @Value("port")
  private readonly test: number;

  constructor() {
    console.log(this.test);
  }

  public getHello(): number {
    return this.test;
  }
}

@Injectable()
export class TestService {
  @Autowired
  private readonly appService: AppService;

  constructor() {
    console.log(this.appService.getHello());
  }
}

new NailyInjectableFactory(TestService).create();
