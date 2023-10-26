export namespace NailyWebArgumentHost {
  export interface ArgumentHost<Request = any, Response = any> {
    getRequest(): Request;
    getResponse(): Response;
  }
  export interface PipeArgumentHost<Request = any, Response = any> extends ArgumentHost<Request, Response> {
    dataProvider: "body" | "query" | "params";
  }
}

export namespace INailyWebImpl {
  export interface WebPipe {
    transform(value: any, metadata: NailyWebArgumentHost.PipeArgumentHost): any;
  }
  export interface WebGuard {
    canActivate(context: any): boolean | Promise<boolean>;
  }
  export interface WebExceptionFilter {
    catch(exception: any, host: any): void;
  }
}
