import { NailyFactoryContext } from "../factories";
import { Type } from "./common.typing";

export interface FactoryItem<T extends Object = Object> {
  target: Type<T>;
  instance: T;
}

declare global {
  export namespace $ {
    export namespace Impl {
      export namespace Ioc {
        export interface BaseFactory {
          get(token: string): FactoryItem;
          getAll(): FactoryItem[];
          getMap(): Map<string, FactoryItem>;
          rawAdd(token: string, target: Type, instance: Object): void;
          remove(token: string): void;
        }
        export interface Factory extends BaseFactory {
          add<T extends Object = Object>(target: Type<T>, token?: string): FactoryItem<T> | void;
        }
        export interface Plugin {
          install(ctx: typeof NailyFactoryContext): void;
        }
      }
    }
  }
}
