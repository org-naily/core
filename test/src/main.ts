import { Autowired, Injectable, NLifeCycle, NailyInjectableManager, Value } from "@naily/core";

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
