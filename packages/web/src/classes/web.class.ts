import { Injectable } from "@naily/core";
import { NailyExpWebFactory } from "./exp.class";
import { NExpAdapter } from "..";

@Injectable()
export class NailyWebFactory {
  public static createExpApplication(adapter: NExpAdapter, callBack?: (port: number) => void) {
    return new NailyExpWebFactory(adapter, callBack ? callBack : () => {});
  }
}
