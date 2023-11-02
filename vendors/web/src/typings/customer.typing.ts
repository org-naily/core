import { NLifeCycle, Type } from "@naily/core";

export namespace NPipe {
  export namespace Meta {
    export interface HaveParameterOptions {
      type: "params" | "query" | "body" | "headers";
      key?: string;
      index: number;
    }

    export interface HavePipeParameterOptions extends HaveParameterOptions {
      pipes: Type<NPipe>[];
    }

    export interface NoParameterOptions {
      type: "cookies" | "ip" | "ips" | "req" | "res" | "next";
      index: number;
    }
    export type ParameterOptions = HaveParameterOptions | NoParameterOptions;
  }
  export interface PipeArgumentMeta {
    dataType: "body" | "query" | "params";
    type: any;
    key: string | undefined;
  }
}
export interface NPipe extends NLifeCycle {
  transform(value: any, host: NPipe.PipeArgumentMeta): any;
}
