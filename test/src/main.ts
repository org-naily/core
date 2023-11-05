import { Autowired, Aspect, Injectable, NAdvice, Value, NailyFactory } from "@naily/core";

@Injectable()
export class TestService implements NAdvice {
  whenBefore(ctx: NAdvice.BeforeCtx): void {
    console.log(ctx.getArgs());
  }

  whenAfter(ctx: NAdvice.AfterCtx): void {
    console.log(ctx.getReturnValue());
  }
}

@Injectable()
export class MainService {
  @Autowired
  readonly testService: TestService;
  @Value("1 + 1")
  readonly test: number;

  constructor() {
    setInterval(() => {
      console.log(this.test);
    }, 1000);
  }

  @Aspect(TestService)
  public getHello() {
    return "Hello World!";
  }
}

NailyFactory.pipe(MainService).createInstance();
