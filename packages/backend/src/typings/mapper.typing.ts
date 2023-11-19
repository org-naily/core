import { NFilter, NHttpMethod, NPipe, ReflectedType } from "./web.typing";
import { NToken, Type } from "@naily/core";

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
      pipes: Type<NPipe>[];
    }
    export interface Query extends Base {
      decoratorType: "query";
      name: string;
      pipes: Type<NPipe>[];
    }
    export interface Params extends Base {
      decoratorType: "params";
      name: string;
      pipes: Type<NPipe>[];
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
  export interface FilterMapper {
    filter: Type<NFilter>;
    catcher: Type[];
  }
  export interface ControllerMapper {
    propertyKey: string | symbol;
    methods: MethodMapper[];
    filters: FilterMapper[];
    returnType: ReflectedType;
    paramMapper: ParamMapper[];
  }
}

export interface NailyMapper {
  token: NToken;
  controllerPaths: string[];
  mapper: NailyMapper.ControllerMapper[];
}
