import { NWebExpArgumentHost, NWebExpPipeArgumentHost } from "./common.typing";

declare global {
  export namespace $ {
    export namespace Impl {
      export namespace Web {
        export interface ExpAdapter {
          onRequestChange(): void;
          onController(): void;
          onError(): void;
          onListen(port: number, callBack: (port: number) => void): any;
        }
        export interface CtxAdapter {}
        export interface Pipe {
          transform(value: any, argumentHost: NWebExpPipeArgumentHost): any;
        }
        export interface Guard {
          canActivate(argumentHost: NWebExpArgumentHost): boolean;
        }
        export interface Filter {
          catch(exception: any, argumentHost: NWebExpArgumentHost): any;
        }
      }
    }
  }
}

export {};
