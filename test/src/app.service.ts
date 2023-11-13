import { Injectable, NLifeCycle } from "@naily/core";

@Injectable()
export class AppService implements NLifeCycle {
  public getHello(): number {
    return 100;
  }
}
