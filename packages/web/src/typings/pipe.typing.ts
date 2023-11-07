import { Type } from "@naily/core";

export namespace NPipe {
  export interface Metadata {
    user: "param" | "query" | "body" | undefined;
    key: string | undefined;
    type: any | undefined;
  }
  export interface PipeMetadata {
    user: "param" | "query" | "body";
    key: string | undefined;
    pipes: Type<NPipe>[];
  }
}
export interface NPipe {
  transform(value: any, metadata: NPipe.Metadata): any;
}
