import { Injectable } from "@naily/core";
import { NExpWebAdvice } from "@naily/web";

@Injectable()
export class AppService implements NExpWebAdvice {
  beforeExecution(ctx: NExpWebAdvice.NWebAdviceBeforeContext): boolean | Promise<boolean> {
    return false;
  }

  public getHello(): number {
    return 100;
  }
}
