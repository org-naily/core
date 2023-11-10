import { Autowired, Injectable, NLifeCycle, NailyInjectableFactory, Value } from "@naily/core";

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
  @Autowired
  private readonly appService: AppService;

  constructor() {
    console.log();
  }
}

new NailyInjectableFactory(TestService).create();
