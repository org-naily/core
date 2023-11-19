import { NFilter, NPipe, NailyMapper } from "@org-naily/backend";
import { NailyFactory } from "@org-naily/core";
import { NextFunction, Request, Response } from "express";

export class NailyExpressHandler {
  public useResponse = false;

  constructor(
    private req: Request,
    private res: Response,
    private next: NextFunction,
  ) {}

  private getPipeHost(methodMapper: NailyMapper.MethodMapper, decoratorType: "body" | "query" | "params", name: string = undefined): NPipe.Host {
    return {
      getName: () => name,
      getRequest: <Request>() => this.req as Request,
      getResponse: <Response>() => {
        this.useResponse = true;
        return this.res as Response;
      },
      getContext: () => undefined,
      getDecoratorType: () => decoratorType,
      getHttpMethod: () => methodMapper.method,
    };
  }

  private getFilterHost(methodMapper: NailyMapper.MethodMapper): NFilter.Host {
    return {
      getRequest: <Request>() => this.req as Request,
      getResponse: <Response>() => {
        this.useResponse = true;
        return this.res as Response;
      },
      getContext: () => undefined,
      getHttpMethod: () => methodMapper.method,
    };
  }

  public async getParameter(methodMapper: NailyMapper.MethodMapper, controllerMapper: NailyMapper.ControllerMapper) {
    const parameter = await Promise.all(
      controllerMapper.paramMapper.map(async (v) => {
        if (v.decoratorType === "request") return this.req;
        if (v.decoratorType === "response") return this.res;
        if (v.decoratorType === "next") return this.next;
        if (v.decoratorType === "headers") return this.req.headers;
        if (v.decoratorType === "cookies") return this.req.cookies;
        if (v.decoratorType === "ip") return this.req.ip;
        if (v.decoratorType === "ips") return this.req.ips;
        if (v.decoratorType === "other") return undefined;

        if (v.decoratorType === "params") {
          for (const pipe of v.pipes) {
            const instance = new NailyFactory(pipe).getInstance();
            if (v.name) {
              this.req.params[v.name] = await instance.transform(this.req.params[v.name], this.getPipeHost(methodMapper, "params"));
            } else {
              this.req.params = await instance.transform(this.req.params, this.getPipeHost(methodMapper, "params"));
            }
          }
          return v.name ? this.req.params[v.name] : this.req.params;
        }

        if (v.decoratorType === "query") {
          for (const pipe of v.pipes) {
            const instance = new NailyFactory(pipe).getInstance();
            if (v.name) {
              this.req.query[v.name] = await instance.transform(this.req.query[v.name], this.getPipeHost(methodMapper, "params", v.name));
            } else {
              this.req.query = await instance.transform(this.req.query, this.getPipeHost(methodMapper, "params"));
            }
          }
          return v.name ? this.req.query[v.name] : this.req.query;
        }

        if (v.decoratorType === "body") {
          for (const pipe of v.pipes) {
            const instance = new NailyFactory(pipe).getInstance();
            if (v.name) {
              this.req.body[v.name] = await instance.transform(this.req.body[v.name], this.getPipeHost(methodMapper, "params", v.name));
            } else {
              this.req.body = await instance.transform(this.req.body, this.getPipeHost(methodMapper, "params"));
            }
          }
          return v.name ? this.req.body[v.name] : this.req.body;
        }
      }),
    );

    return parameter;
  }

  public async getBeforeFilter(methodMapper: NailyMapper.MethodMapper, controllerMapper: NailyMapper.ControllerMapper) {
    for (const { filter } of controllerMapper.filters) {
      await new NailyFactory(filter).getInstance()?.beforeExecute(this.getFilterHost(methodMapper));
    }
  }

  public async getAfterFilter(methodMapper: NailyMapper.MethodMapper, controllerMapper: NailyMapper.ControllerMapper) {
    for (const { filter } of controllerMapper.filters) {
      await new NailyFactory(filter).getInstance()?.afterExecute(this.getFilterHost(methodMapper));
    }
  }

  public async getCatchFilter(methodMapper: NailyMapper.MethodMapper, controllerMapper: NailyMapper.ControllerMapper, error: Error) {
    if (controllerMapper.filters.length === 0) {
      return this.res
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
        return await new NailyFactory(filter).getInstance()?.catch(error, this.getFilterHost(methodMapper));
      }

      for (const catcherElement of catcher) {
        if (catcherElement instanceof error.constructor || catcherElement === error.constructor) {
          await new NailyFactory(filter).getInstance()?.catch(error, this.getFilterHost(methodMapper));
        }
      }
    }
  }

  public async getFinallyFilter(methodMapper: NailyMapper.MethodMapper, controllerMapper: NailyMapper.ControllerMapper) {
    for (const { filter } of controllerMapper.filters) {
      await new NailyFactory(filter).getInstance()?.finallyExecute(this.getFilterHost(methodMapper));
    }
  }
}
