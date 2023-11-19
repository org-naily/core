import { NFilter, NPipe, NailyMapper } from "@naily/backend";
import { NIOC, NailyFactory, NailyRepository } from "@naily/core";
import { Express, NextFunction, Request, Response } from "express";
import { join } from "path";

export class NailyExpressAnalyser {
  private analysePath(controllerPath: string, path: string) {
    return join("/" + controllerPath, path).replace(/\\/g, "/");
  }

  private getHandler(methodMapper: NailyMapper.MethodMapper, controllerMapper: NailyMapper.ControllerMapper, Repository: NIOC.ClassElement<any>) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let useResponse = false;

      try {
        function getHost(decoratorType: "body" | "query" | "params", name: string = undefined): NPipe.Host {
          return {
            getName: () => name,
            getRequest: <Request>() => req as Request,
            getResponse: <Response>() => {
              useResponse = true;
              return res as Response;
            },
            getDecoratorType: () => decoratorType,
            getHttpMethod: () => methodMapper.method,
          };
        }
        const parameter = await Promise.all(
          controllerMapper.paramMapper.map(async (v) => {
            if (v.decoratorType === "request") return req;
            if (v.decoratorType === "response") return res;
            if (v.decoratorType === "next") return next;
            if (v.decoratorType === "headers") return req.headers;
            if (v.decoratorType === "cookies") return req.cookies;
            if (v.decoratorType === "ip") return req.ip;
            if (v.decoratorType === "ips") return req.ips;
            if (v.decoratorType === "other") return undefined;

            if (v.decoratorType === "params") {
              for (const pipe of v.pipes) {
                const instance = new NailyFactory(pipe).getInstance();
                if (v.name) {
                  req.params[v.name] = await instance.transform(req.params[v.name], getHost("params", v.name));
                } else {
                  req.params = await instance.transform(req.params, getHost("params"));
                }
              }
              return v.name ? req.params[v.name] : req.params;
            }

            if (v.decoratorType === "query") {
              for (const pipe of v.pipes) {
                const instance = new NailyFactory(pipe).getInstance();
                if (v.name) {
                  req.query[v.name] = await instance.transform(req.query[v.name], getHost("params", v.name));
                } else {
                  req.query = await instance.transform(req.query, getHost("params"));
                }
              }
              return v.name ? req.query[v.name] : req.query;
            }

            if (v.decoratorType === "body") {
              for (const pipe of v.pipes) {
                const instance = new NailyFactory(pipe).getInstance();
                if (v.name) {
                  req.body[v.name] = await instance.transform(req.body[v.name], getHost("params", v.name));
                } else {
                  req.body = await instance.transform(req.body, getHost("params"));
                }
              }
              return v.name ? req.body[v.name] : req.body;
            }
          }),
        );
        const value = Repository.instance[controllerMapper.propertyKey](...parameter);
        if (!useResponse) res.send(value).end();
      } catch (error) {
        function getHost(): NFilter.Host {
          return {
            getRequest: <Request>() => req as Request,
            getResponse: <Response>() => res as Response,
            getHttpMethod: () => methodMapper.method,
          };
        }

        if (controllerMapper.filters.length === 0) {
          res
            .status(500)
            .send({
              statusCode: 500,
              message: "Internal Server Error",
              timestamp: new Date(),
            })
            .end();
        }

        for (const { filter, catcher } of controllerMapper.filters) {
          if (catcher.length === 0) {
            return new NailyFactory(filter).getInstance().catch(error, getHost());
          }

          for (const catcherElement of catcher) {
            if (catcherElement instanceof error.constructor || catcherElement === error.constructor) {
              return new NailyFactory(filter).getInstance().catch(error, getHost());
            }
          }
        }
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
