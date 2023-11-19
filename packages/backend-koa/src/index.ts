import { NPipe, NUpperCaseHttpMethod, NailyWebConfiguration, NailyWebFactory, convertUppercase } from "@naily/backend";
import { Injectable, NailyFactory, Type, Value } from "@naily/core";
import Koa, { Context, Next } from "koa";
import Router from "koa-router";
import { koaBody } from "koa-body";
import { NailyKoaAnalyser } from "./analyser.class";

@Injectable()
export class KoaFactory extends NailyWebFactory {
  private app = new Koa();
  private router = new Router();

  constructor(protected readonly configuration: Partial<NailyWebConfiguration> = { EnableComponent: true }) {
    super(configuration);
    this.app.use(koaBody());
    this.app.use(this.router.routes()).use(this.router.allowedMethods());
  }

  use(handler: (ctx: Context, next: Next) => any): this {
    this.app.use(handler);
    return this;
  }

  useGlobalPipe(pipe: Type<NPipe>): this {
    this.app.use((ctx, next) => {
      const instance = new NailyFactory(pipe).getInstance();
      instance.transform(ctx.params, {
        getName: () => undefined,
        getRequest: () => undefined,
        getResponse: () => undefined,
        getContext: () => undefined,
        getDecoratorType: () => "params",
        getHttpMethod: () => convertUppercase(ctx.method as NUpperCaseHttpMethod),
      });
      instance.transform(ctx.query, {
        getName: () => undefined,
        getRequest: <Request>() => ctx as Request,
        getResponse: <Response>() => ctx as Response,
        getContext: () => undefined,
        getDecoratorType: () => "query",
        getHttpMethod: () => convertUppercase(ctx.method as NUpperCaseHttpMethod),
      });
      instance.transform(ctx.body, {
        getName: () => undefined,
        getRequest: <Request>() => ctx as Request,
        getResponse: <Response>() => ctx as Response,
        getContext: () => undefined,
        getDecoratorType: () => "body",
        getHttpMethod: () => convertUppercase(ctx.method as NUpperCaseHttpMethod),
      });
      next();
    });
    return this;
  }

  listen(callBack: (port: number) => any) {
    new NailyKoaAnalyser(KoaFactory.mapper, this.router);
    return this.app.listen(this.port, () => (callBack ? callBack(this.port) : void 0));
  }
}
