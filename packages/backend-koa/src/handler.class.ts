import { NFilter, NPipe, NailyMapper } from "@org-naily/backend";
import { NailyFactory } from "@org-naily/core";
import { Context, Next } from "koa";

export class NailyKoaHandler {
  constructor(
    private readonly ctx: Context,
    private readonly next: Next,
  ) {}

  private getPipeHost(methodMapper: NailyMapper.MethodMapper, decoratorType: "body" | "query" | "params", name: string = undefined): NPipe.Host {
    return {
      getName: () => name,
      getRequest: () => undefined,
      getResponse: () => undefined,
      getContext: <Context>() => this.ctx as Context,
      getDecoratorType: () => decoratorType,
      getHttpMethod: () => methodMapper.method,
    };
  }

  private getFilterHost(methodMapper: NailyMapper.MethodMapper): NFilter.Host {
    return {
      getRequest: () => undefined,
      getResponse: () => undefined,
      getContext: <Context>() => this.ctx as Context,
      getHttpMethod: () => methodMapper.method,
    };
  }

  public async getParameter(methodMapper: NailyMapper.MethodMapper, controllerMapper: NailyMapper.ControllerMapper) {
    const parameter = await Promise.all(
      controllerMapper.paramMapper.map(async (v) => {
        if (v.decoratorType === "context") return this.ctx;
        if (v.decoratorType === "next") return this.next;
        if (v.decoratorType === "headers") return this.ctx.request.headers;
        if (v.decoratorType === "cookies") return this.ctx.cookies;
        if (v.decoratorType === "ip") return this.ctx.ip;
        if (v.decoratorType === "ips") return this.ctx.ips;
        if (v.decoratorType === "other") return undefined;

        if (v.decoratorType === "params") {
          for (const pipe of v.pipes) {
            const instance = new NailyFactory(pipe).getInstance();
            if (v.name) {
              this.ctx.params[v.name] = await instance.transform(this.ctx.params[v.name], this.getPipeHost(methodMapper, "params"));
            } else {
              this.ctx.params = await instance.transform(this.ctx.params, this.getPipeHost(methodMapper, "params"));
            }
          }
          return v.name ? this.ctx.params[v.name] : this.ctx.params;
        }

        if (v.decoratorType === "query") {
          for (const pipe of v.pipes) {
            const instance = new NailyFactory(pipe).getInstance();
            if (v.name) {
              this.ctx.query[v.name] = await instance.transform(this.ctx.query[v.name], this.getPipeHost(methodMapper, "params", v.name));
            } else {
              this.ctx.query = await instance.transform(this.ctx.query, this.getPipeHost(methodMapper, "params"));
            }
          }
          return v.name ? this.ctx.query[v.name] : this.ctx.query;
        }

        if (v.decoratorType === "body") {
          for (const pipe of v.pipes) {
            const instance = new NailyFactory(pipe).getInstance();
            if (v.name) {
              this.ctx.body[v.name] = await instance.transform(this.ctx.body[v.name], this.getPipeHost(methodMapper, "params", v.name));
            } else {
              this.ctx.body = await instance.transform(this.ctx.body, this.getPipeHost(methodMapper, "params"));
            }
          }
          return v.name ? this.ctx.body[v.name] : this.ctx.body;
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
      this.ctx.status = 500;
      this.ctx.body = {
        statusCode: 500,
        message: "Internal Server Error",
        timestamp: new Date(),
      };
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
