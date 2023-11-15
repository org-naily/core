import { NailyFactory } from "@/classes/factory.class";
import { Type } from "./common.typing";
import { NIOC } from "./ioc.typing";
import { NConfigure } from "./impl.typing";

export namespace NRepository {
  export interface ClassElement<T> {
    type: "class";
    target: Type<T>;
    instance: T;
    options: NIOC.InjectableOptions;
  }
  export type Element<T> = ClassElement<T>;
}
export interface NAction {
  beforeExecute?<Instance>(ctx: NailyFactory<Instance>, argument: NAction.BeforeArgument): void | Promise<void>;
  afterExecute?<Instance>(ctx: NailyFactory<Instance>, argument: NAction.AfterArgument): void | Promise<void>;
  onError?<Instance>(ctx: NailyFactory<Instance>, error: Error): void | Promise<void>;
}
export namespace NAction {
  export interface BeforeArgument {
    setParameters<T = any>(parameters: T[]): void;
  }
  export interface AfterArgument {
    getInstance<T = any>(): T;
    setInstance<T = any>(newInstance: T): void;
  }
}
