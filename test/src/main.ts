import { Autowired, Aspect, Injectable, NAdvice } from "@naily/core";

@Injectable()
export class TestService implements NAdvice {
  whenBefore(): void {
    console.log("before");
  }

  whenAfter(ctx: NAdvice.AfterCtx): void {
    console.log(ctx.getReturnValue());
  }
}

@Injectable()
export class MainService {
  @Autowired
  readonly testService: TestService;

  @Aspect(TestService)
  public getHello() {
    return "Hello World!";
  }
}
