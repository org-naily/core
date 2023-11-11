import { Autowired, Configuration, Injectable, NLifeCycle, NailyInjectableManager, Value } from "@naily/core";

@Configuration()
export class AppConfiguration {}

@Injectable()
export class AppService implements NLifeCycle {
  public getHello(): number {
    return 100;
  }
}

@Injectable()
export class TestService {
  @Autowired
  private readonly appService: AppService;
}

console.log(NailyInjectableManager.getMap());
