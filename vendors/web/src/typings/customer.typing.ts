import { NLifeCycle } from "@naily/core";

export namespace NPipe {
  export interface PipeArgumentMeta {
    dataType: "body" | "query" | "params";
    type: any;
    key: string | undefined;
  }
}
export interface NPipe extends NLifeCycle {
  transform<In = any, Out = any>(value: In, host: NPipe.PipeArgumentMeta): Out;
}
