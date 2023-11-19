import { NToken, Type } from "@naily/core";

export type NHttpMethod = "get" | "post" | "put" | "delete" | "patch" | "options" | "head" | "all" | "trace";
export type ReflectedType<T = any> = Function | Object | String | Number | Boolean | Symbol | undefined | null | Type<T>;
export type DecoratorType = "request" | "response" | "next" | "body" | "query" | "params" | "headers" | "cookies" | "ip" | "ips" | "other";

export namespace NailyMapper {
  export interface MethodMapper {
    method: NHttpMethod;
    path: string;
  }
  export type ParamMapper =
    | ParamMapper.Request
    | ParamMapper.Response
    | ParamMapper.Next
    | ParamMapper.Body
    | ParamMapper.Query
    | ParamMapper.Params
    | ParamMapper.Headers
    | ParamMapper.Cookies
    | ParamMapper.Ip
    | ParamMapper.Ips
    | ParamMapper.Other;
  export namespace ParamMapper {
    export interface Base {
      type: ReflectedType;
    }
    export interface Request extends Base {
      decoratorType: "request";
    }
    export interface Response extends Base {
      decoratorType: "response";
    }
    export interface Next extends Base {
      decoratorType: "next";
    }
    export interface Body extends Base {
      decoratorType: "body";
      name: string;
      pipes: Type[];
    }
    export interface Query extends Base {
      decoratorType: "query";
      name: string;
      pipes: Type[];
    }
    export interface Params extends Base {
      decoratorType: "params";
      name: string;
      pipes: Type[];
    }
    export interface Headers extends Base {
      decoratorType: "headers";
    }
    export interface Cookies extends Base {
      decoratorType: "cookies";
    }
    export interface Ip extends Base {
      decoratorType: "ip";
    }
    export interface Ips extends Base {
      decoratorType: "ips";
    }
    export interface Other extends Base {
      decoratorType: "other";
    }
  }
  export interface ControllerMapper {
    propertyKey: string | symbol;
    methods: MethodMapper[];
    returnType: ReflectedType;
    paramMapper: ParamMapper[];
  }
}

export interface NailyMapper {
  token: NToken;
  controllerPaths: string[];
  mapper: NailyMapper.ControllerMapper[];
}

export interface NailyWebConfiguration {}
