import { Scope } from "../constants";
import { NConfigure } from "./configure.typing";

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}

declare global {
  export namespace NIOC {
    interface Metadata {
      Token: string | symbol;
      Scope: Scope;
      Initialize: boolean;
    }
    export interface ValueMetadata extends Omit<Metadata, "Initialize"> {
      configure: Type<NConfigure>;
    }
    export interface InjectableMeta extends Metadata {
      Rebind: boolean;
    }
    export interface ConfigurationMetadata extends Omit<InjectableMeta, "Initialize"> {}

    export interface ClassElementConfigure {
      isConfigure: boolean;
      configureValue?: any;
    }

    export interface ClassElement<T = any> {
      type: "class";
      target: Type<T>;
      instance: T;
      configure: ClassElementConfigure;
    }
    export type Element = ClassElement;
  }
  export namespace NAOP {
    export interface Advice {
      before?(instance: Object, target: Type, propertyKey: string | symbol): void | Promise<void>;
      after?(instance: Object, target: Type, propertyKey: string | symbol, returnValue: any): any | Promise<any>;
      throw?(instance: Object, target: Type, propertyKey: string | symbol, error: Error): void | Promise<void>;
    }
  }
}
