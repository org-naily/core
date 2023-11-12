import { Injectable, Value } from "@naily/core";
import { NailyExpWebFactory } from "./exp.class";
import { NExpAdapter } from "..";

@Injectable()
export class NailyWebFactory {
  @Value("naily.web.adapter")
  private static readonly adapter: "express" | "context";

  public static createExpApplication(adapter: NExpAdapter, callBack?: (port: number) => void) {
    if (this.adapter !== "express") throw new Error("naily.yaml Adapter is not express, cannot create express application");
    return new NailyExpWebFactory(adapter, callBack ? callBack : () => {});
  }
}
