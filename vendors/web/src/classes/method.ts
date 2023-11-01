import { NContainer, NailyClassFactory, NailyFactory, Type } from "@naily/core";
import { HttpMethodType, NExpAdapter, NPipe, WebArgumentHost, WebExpExtractor } from "../typings";
import { NailyWebWatermark } from "../constants/warermark.constant";
import { ParameterOptions } from "../decorators";
import { translatePath } from "../utils/path";

export class NailyExpWebCore<Request, Response, NextFunction> {
  constructor(private readonly adapter: NExpAdapter<Response, Request, NextFunction>) {}

  private analyzeHaveResponse(classElement: NContainer.ClassElement, key: string | symbol): boolean {
    const method: Function = classElement.instance[key];
    const paramOptions: ParameterOptions[] = Reflect.getMetadata(NailyWebWatermark.PARAMETERS, classElement.target.prototype, key) || [];
    let haveResponse = false;
    paramOptions.forEach((param) => {
      param.type === "res" ? (haveResponse = true) : void 0;
    });
    return haveResponse;
  }

  private initHandlerMethod(classElement: NContainer.ClassElement, key: string | symbol, options: WebExpExtractor) {
    const method: Function = classElement.instance[key];
    const params: any[] = [];
    const paramOptions: ParameterOptions[] = Reflect.getMetadata(NailyWebWatermark.PARAMETERS, classElement.target.prototype, key) || [];

    for (const i in paramOptions) {
      const item = paramOptions[i];
      if (item.type === "params") {
        if (item.key) {
          params[i] = options.params[item.key];
        } else {
          params[i] = options.params;
        }
      } else if (item.type === "query") {
        if (item.key) {
          params[i] = options.query[item.key];
        } else {
          params[i] = options.query;
        }
      } else if (item.type === "body") {
        if (item.key) {
          params[i] = options.body[item.key];
        } else {
          params[i] = options.body;
        }
      } else if (item.type === "headers") {
        if (item.key) {
          params[i] = options.headers[item.key];
        } else {
          params[i] = options.headers;
        }
      } else if (item.type === "cookies") {
        params[i] = options.cookies;
      } else if (item.type === "ip") {
        params[i] = options.ip;
      } else if (item.type === "ips") {
        params[i] = options.ips;
      } else if (item.type === "req") {
        params[i] = options.req;
      } else if (item.type === "res") {
        params[i] = options.res;
      } else if (item.type === "next") {
        params[i] = options.next;
      }
    }

    return method.call(classElement.instance, ...params);
  }

  public initHandler(controllerPath: string, classElement: NContainer.ClassElement) {
    const ownKeys = NailyClassFactory.getPrototypeOwnKeys(classElement.target);
    for (const key of ownKeys) {
      const method = classElement.instance[key];
      if (typeof method !== "function") continue;
      const handler = (options: WebExpExtractor) => this.initHandlerMethod(classElement, key, options);
      const getArgumentHost = (method: HttpMethodType, path: string): WebArgumentHost => {
        return {
          getMethod: () => method,
          getPath: () => translatePath(controllerPath, path),
          getHaveResponse: () => this.analyzeHaveResponse(classElement, key),
        };
      };

      const getPath: string | undefined = Reflect.getMetadata(NailyWebWatermark.GET, classElement.target.prototype, key);
      if (getPath) this.adapter.handler(getArgumentHost("get", getPath), handler);
      const postPath: string | undefined = Reflect.getMetadata(NailyWebWatermark.POST, classElement.target.prototype, key);
      if (postPath) this.adapter.handler(getArgumentHost("post", postPath), handler);
      const putPath: string | undefined = Reflect.getMetadata(NailyWebWatermark.PUT, classElement.target.prototype, key);
      if (putPath) this.adapter.handler(getArgumentHost("put", putPath), handler);
      const deletePath: string | undefined = Reflect.getMetadata(NailyWebWatermark.DELETE, classElement.target.prototype, key);
      if (deletePath) this.adapter.handler(getArgumentHost("delete", deletePath), handler);
      const patchPath: string | undefined = Reflect.getMetadata(NailyWebWatermark.PATCH, classElement.target.prototype, key);
      if (patchPath) this.adapter.handler(getArgumentHost("patch", patchPath), handler);
      const optionsPath: string | undefined = Reflect.getMetadata(NailyWebWatermark.OPTIONS, classElement.target.prototype, key);
      if (optionsPath) this.adapter.handler(getArgumentHost("options", optionsPath), handler);
      const headPath: string | undefined = Reflect.getMetadata(NailyWebWatermark.HEAD, classElement.target.prototype, key);
      if (headPath) this.adapter.handler(getArgumentHost("head", headPath), handler);
      const allPath: string | undefined = Reflect.getMetadata(NailyWebWatermark.ALL, classElement.target.prototype, key);
      if (allPath) this.adapter.handler(getArgumentHost("all", allPath), handler);
      const tracePath: string | undefined = Reflect.getMetadata(NailyWebWatermark.TRACE, classElement.target.prototype, key);
      if (tracePath) this.adapter.handler(getArgumentHost("trace", tracePath), handler);
    }
  }

  public initPipe(pipe: Type<NPipe>) {
    const token = NailyClassFactory.getClassToken(pipe);
    const pipeInstance = NailyFactory.NailyContainer.getClassOrThrow<NPipe>(token);

    this.adapter.pipeChanged(async (options) => {
      const newParams = await pipeInstance.instance.transform(options.params, {
        dataType: "params",
        key: undefined,
        type: Object,
      });
      options.params = newParams;
      const newQuery = await pipeInstance.instance.transform(options.query, {
        dataType: "query",
        key: undefined,
        type: Object,
      });
      options.query = newQuery;
      const newBody = await pipeInstance.instance.transform(options.body, {
        dataType: "body",
        key: undefined,
        type: Object,
      });
      options.body = newBody;
      return options;
    });
  }
}
