import { NailyMapper } from "@naily/backend";
import { NailyRepository } from "@naily/core";
import { Middleware } from "koa";
import Router from "koa-router";
import { join } from "path";
import { NailyKoaHandler } from "./handler.class";

export class NailyKoaAnalyser {
  private analysePath(controllerPath: string, path: string) {
    return join("/" + controllerPath, path).replace(/\\/g, "/");
  }

  private getHandler(
    methodMapper: NailyMapper.MethodMapper,
    controllerMapper: NailyMapper.ControllerMapper,
    Repository: NIOC.ClassElement,
  ): Middleware {
    return async (ctx, next) => {
      const Handler = new NailyKoaHandler(ctx, next);

      try {
        const parameter = await Handler.getParameter(methodMapper, controllerMapper);
        Handler.getBeforeFilter(methodMapper, controllerMapper);
        const value = await Repository.instance[controllerMapper.propertyKey](...parameter);
        Handler.getAfterFilter(methodMapper, controllerMapper);
        if (!ctx.body) ctx.body = value;
      } catch (error) {
        await Handler.getCatchFilter(methodMapper, controllerMapper, error);
      } finally {
        await Handler.getFinallyFilter(methodMapper, controllerMapper);
      }
    };
  }

  constructor(
    private readonly mapper: NailyMapper[],
    router: Router,
  ) {
    for (const NailyMapper of this.mapper) {
      const Repository = NailyRepository.getClassElement(NailyMapper.token);
      for (const controllerMapper of NailyMapper.mapper) {
        for (const MethodMapper of controllerMapper.methods) {
          NailyMapper.controllerPaths.forEach((controllerPath) => {
            router[MethodMapper.method](
              this.analysePath(controllerPath, MethodMapper.path),
              this.getHandler(MethodMapper, controllerMapper, Repository),
            );
          });
        }
      }
    }
  }
}
