import { Class, UseAction, NAction, NAfterActionHost, NLifeCycle, Type, NailyFactory } from "@naily/core";
import { NailyExpWebPlugin } from "@naily/web";
import { ExpressAdapter } from "@naily/web-express";

@Class()
export class TestAction implements NAction {
  afterAction<T = Type<NLifeCycle>>(target: T, instance: NLifeCycle, host: NAfterActionHost): void {
    console.log(target);
  }
}

@Class()
export class TestService {}

@Class()
@UseAction(TestAction)
export class AppService {
  constructor(private readonly testService: TestService) {}
}

NailyFactory.use(new NailyExpWebPlugin(new ExpressAdapter()).listen(3000));
