import { NWebExpAdapterHandlerOptions, NWebExpAdapterRequestChangeOptions } from "./adapter.typing";
import { NWebExpArgumentHost, NWebExpPipeArgumentHost } from "./argument.typing";

declare global {
  export namespace $ {
    export namespace Impl {
      export namespace Web {
        export interface Pipe {
          transform(value: any, argumentHost: NWebExpPipeArgumentHost): any;
        }
        export interface Guard {
          canActivate(argumentHost: NWebExpArgumentHost): boolean;
        }
        export interface Filter {
          catch(exception: any, argumentHost: NWebExpArgumentHost): any;
        }
        export interface ExpAdapter {
          onRequestChange(handler: (handlerOptions: NWebExpAdapterRequestChangeOptions) => NWebExpAdapterRequestChangeOptions): void;
          onController(method: $.Util.Web.HttpMethod, path: string, handler: (handlerOptions: NWebExpAdapterHandlerOptions) => any): void;
          onError(): void;
          onListen(port: number, callBack?: (port: number) => void): any;
        }
        export interface CtxAdapter {}
      }
    }
  }
}

export {};
