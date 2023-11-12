import { Injectable, NailyInjectableFactory, Type, Value } from "@naily/core";
import { NailyExpWebFactory } from "./exp.class";
import { NExpAdapter } from "@/typings";

@Injectable()
export class NailyWebFactory {
  @Value("naily.web.adapter")
  private readonly adapter: "express" | "context";

  public createExpApplication<Request, Response, NextFunction extends Function>(
    adapter: Type<NExpAdapter<Request, Response, NextFunction>>
  ): NailyExpWebFactory<Request, Response, NextFunction> {
    if (this.adapter !== "express") throw new Error("naily.yaml Adapter is not express, cannot create express application");
    return new NailyExpWebFactory<Request, Response, NextFunction>(new NailyInjectableFactory(adapter).create());
  }
}
