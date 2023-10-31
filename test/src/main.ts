import { Class, UseAction, NAction, NAfterActionHost, NLifeCycle, Type, NPlugin, NContainer, NailyFactory } from "@naily/core";
import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { Server } from "http";

@Class()
export class TestAction implements NAction {
  afterAction<T = Type<NLifeCycle>>(target: T, instance: NLifeCycle, host: NAfterActionHost): void {
    console.log(target);
  }
}

export class TestPlugin {
  private readonly app = express();

  use(handler: (req: Request, res: Response, next: NextFunction) => void) {
    this.app.use(handler);
    return this;
  }

  listen(port: number, callback?: (port: number) => Server) {
    const that = this;
    return class implements NPlugin {
      install(container: NContainer): void {
        const allElement = container.getMap();
        for (const [key, value] of allElement) {
          if (value.type !== "class") continue;
        }
        that.app.listen(port, () => callback(port));
      }
    };
  }
}

@Class()
export class TestService {}

@Class()
@UseAction(TestAction)
export class AppService {
  constructor(private readonly testService: TestService) {}
}

NailyFactory.use(new TestPlugin().use(express.json()).listen(3000));
