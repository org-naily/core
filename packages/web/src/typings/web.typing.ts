declare global {
  export namespace $ {
    export namespace Util {
      export namespace Web {
        export const enum HttpMethod {
          GET = "get",
          POST = "post",
          PUT = "put",
          DELETE = "delete",
          PATCH = "patch",
          ALL = "all",
          OPTIONS = "options",
          HEAD = "head",
          TRACE = "trace",
        }
      }
    }
  }
}

export {};
