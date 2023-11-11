import { Autowired, Configuration, Injectable, NLifeCycle, NailyInjectableManager, Value } from "@naily/core";

@Configuration()
export class AppConfiguration {}

@Injectable()
export class AppService implements NLifeCycle {
  @Value("port")
  private readonly test: number;

  public getHello(): number {
    return this.test;
  }
}

@Injectable()
export class TestService {
  @Autowired
  private readonly appService: AppService;
}

console.log(NailyInjectableManager.getMap());
