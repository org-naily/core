export namespace NFilter {
  export interface ArgumentHost {
    getResponse<T = any>(): T;
    getRequest<T = any>(): T;
  }
}
export interface NFilter {
  catch(error: any, host: NFilter.ArgumentHost): void | Promise<void>;
}
