import { NIoc } from "./inject.typing";

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
  nailyBeforeInit?(ctx: NLifeCycle.BeforeInitArgument): void | Promise<void>;
}
export namespace NLifeCycle {
  export interface CommonArgument {
    getArgs(): any[];
    getArgTypes(): Type<NLifeCycle>[];
    getMetadata(): NIoc.InjectableOptions;
    getInstance(): NLifeCycle;
    getTarget<T>(): Type<T>[];
    setInstance(newInstance: NLifeCycle): void;
  }
  export interface InitArgument extends CommonArgument {}
  export interface BeforeInitArgument extends CommonArgument {
    setTarget(newTarget: Type): void;
  }
}
export interface NLifeCycle {
  nailyInit?(ctx: NLifeCycle.InitArgument): void | Promise<void>;
}
export interface NLifeCycle extends Object {}
