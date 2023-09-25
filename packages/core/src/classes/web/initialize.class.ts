import { join } from "path";
import { AdapterMethod, NailyControllerAdapter, Type } from "../../typings";
import {
  ALL_WATERMARK,
  DELETE_WATERMARK,
  GET_WATERMARK,
  HEAD_WATERMARK,
  OPTIONS_WATERMARK,
  PATCH_WATERMARK,
  POST_WATERMARK,
  PUT_WATERMARK,
  TRACE_WATERMARK,
} from "../../constant/constant";

export class InitializeMethod {
  constructor(
    private readonly adapter: NailyControllerAdapter,
    private readonly path: string,
    private readonly object: Object,
    private readonly item: string | symbol,
    private readonly singleMethod: Function,
    private readonly target: Type
  ) {}

  private getPath(controllerPath: string, methodPath: string) {
    return join("/" + controllerPath, methodPath).replace(/\\/g, "/");
  }

  private init(method: AdapterMethod, singleMethodPath: string) {
    this.adapter.methodIntercept(
      {
        method: method,
        path: this.getPath(this.path, singleMethodPath),
        request: (req) => req,
        response: this.singleMethod.call(this.object),
        params: {},
        query: {},
        body: {},
        ip: "",
      },
      {
        getInstance: () => this.target,
      }
    );
  }

  initGet() {
    let singleMethodPath: string = Reflect.getMetadata(GET_WATERMARK, this.object, this.item);
    if (!singleMethodPath) return this;
    this.init("get", singleMethodPath);
    return this;
  }

  initPost() {
    let singleMethodPath: string = Reflect.getMetadata(POST_WATERMARK, this.object, this.item);
    if (!singleMethodPath) return this;
    this.init("post", singleMethodPath);
    return this;
  }

  initPut() {
    let singleMethodPath: string = Reflect.getMetadata(PUT_WATERMARK, this.object, this.item);
    if (!singleMethodPath) return this;
    this.init("put", singleMethodPath);
    return this;
  }

  initDelete() {
    let singleMethodPath: string = Reflect.getMetadata(DELETE_WATERMARK, this.object, this.item);
    if (!singleMethodPath) return this;
    this.init("delete", singleMethodPath);
    return this;
  }

  initPatch() {
    let singleMethodPath: string = Reflect.getMetadata(PATCH_WATERMARK, this.object, this.item);
    if (!singleMethodPath) return this;
    this.init("patch", singleMethodPath);
    return this;
  }

  initHead() {
    let singleMethodPath: string = Reflect.getMetadata(HEAD_WATERMARK, this.object, this.item);
    if (!singleMethodPath) return this;
    this.init("head", singleMethodPath);
    return this;
  }

  initOptions() {
    let singleMethodPath: string = Reflect.getMetadata(OPTIONS_WATERMARK, this.object, this.item);
    if (!singleMethodPath) return this;
    this.init("options", singleMethodPath);
    return this;
  }

  initTrace() {
    let singleMethodPath: string = Reflect.getMetadata(TRACE_WATERMARK, this.object, this.item);
    if (!singleMethodPath) return this;
    this.init("trace", singleMethodPath);
    return this;
  }

  initAll() {
    let singleMethodPath: string = Reflect.getMetadata(ALL_WATERMARK, this.object, this.item);
    if (!singleMethodPath) return this;
    this.init("all", singleMethodPath);
    return this;
  }
}
