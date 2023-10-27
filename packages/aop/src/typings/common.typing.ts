import { NAopAfterMeta, NAopBeforeMeta } from "./aspect.typing";

declare global {
  export namespace $ {
    export namespace Impl {
      export namespace Aop {
        export interface Before {
          beforeExecute(metadata: NAopBeforeMeta): Promise<void> | void;
        }
        export interface After {
          afterExecute(metadata: NAopAfterMeta): Promise<void> | void;
        }
      }
    }
  }
}

export {};
