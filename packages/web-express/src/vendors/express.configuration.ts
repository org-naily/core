import { Configuration, NailyLifeCircle, Value } from "@naily/core";
import { Express } from "express";
import * as express from "express";

@Configuration
export class ExpressConfiguation implements NailyLifeCircle {
  @Value("web.express.port")
  public readonly port: number;

  private app: Express;

  constructor() {
    this.app = express();
  }

  handleMount(): void {
    this.app.listen(this.port);
  }
}
