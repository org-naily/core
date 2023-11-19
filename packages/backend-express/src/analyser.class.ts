import { NailyMapper } from "@org-naily/backend";
import { NailyRepository } from "@org-naily/core";
import { Express, NextFunction, Request, Response } from "express";
import { join } from "path";
import { NailyExpressHandler } from "./handler.class";

export class NailyExpressAnalyser {
  private analysePath(controllerPath: string, path: string) {
    return join("/" + controllerPath, path).replace(/\\/g, "/");
  }

  private getHandler(methodMapper: NailyMapper.MethodMapper, controllerMapper: NailyMapper.ControllerMapper, Repository: NIOC.ClassElement) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const Handler = new NailyExpressHandler(req, res, next);

      try {
        const parameter = await Handler.getParameter(methodMapper, controllerMapper);
        Handler.getBeforeFilter(methodMapper, controllerMapper);
        const value = await Repository.instance[controllerMapper.propertyKey](...parameter);
        Handler.getAfterFilter(methodMapper, controllerMapper);
        if (!Handler.useResponse) return res.send(value).end();
      } catch (error) {
        await Handler.getCatchFilter(methodMapper, controllerMapper, error);
      } finally {
        await Handler.getFinallyFilter(methodMapper, controllerMapper);
      }
    };
  }

  constructor(
    private readonly mapper: NailyMapper[],
    private readonly app: Express,
  ) {
    for (const NailyMapper of this.mapper) {
      const Repository = NailyRepository.getClassElement(NailyMapper.token);
      for (const controllerMapper of NailyMapper.mapper) {
        for (const MethodMapper of controllerMapper.methods) {
          NailyMapper.controllerPaths.forEach((controllerPath) => {
            this.app[MethodMapper.method](
              this.analysePath(controllerPath, MethodMapper.path),
              this.getHandler(MethodMapper, controllerMapper, Repository),
            );
          });
        }
      }
    }
  }
}
