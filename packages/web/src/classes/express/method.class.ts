import { INailyContainer, NailyDependency } from "@naily/core";
import { join } from "path";
import { IAdapterHandler, IAdapterOptions } from "../../typings";
import { HttpMethod } from "../../constants/method.constant";
import { WATERMARK } from "../../constants/watermark.constant";
import { INFO_WATERMARK } from "../../constants/info.constant";

export class NailyWeb {
  private readonly dependency = NailyDependency.getAll();

  constructor(private readonly adapter: IAdapterOptions) {
    this.dependency = NailyDependency.getAll();

    for (const item of this.dependency.values()) {
      const controllerPath = Reflect.getMetadata(WATERMARK.CONTROLLER, item.target);
      if (!controllerPath) continue;
      const propertyMethodKeys = Reflect.ownKeys(item.target.prototype).filter((item) => item !== "constructor");
      propertyMethodKeys.forEach((jtem) => {
        this.initMethod(controllerPath, item, HttpMethod.GET, jtem);
      });
    }
  }

  private static uriJoin(controllerPath: string, path: string): string {
    return join("/" + controllerPath, path).replace(/\\/g, "/");
  }

  private initParameter(containerItem: INailyContainer, propertyKey: string | symbol, option: IAdapterHandler) {
    const param = [];
    const queryIndexs: number[] = Reflect.getMetadata(INFO_WATERMARK.QUERY, containerItem.target.prototype, propertyKey) || [];
    queryIndexs.forEach((i) => (param[i] = option.query));

    const bodyIndexs: number[] = Reflect.getMetadata(INFO_WATERMARK.BODY, containerItem.target.prototype, propertyKey) || [];
    bodyIndexs.forEach((i) => (param[i] = option.body));

    const paramsIndexs: number[] = Reflect.getMetadata(INFO_WATERMARK.PARAMS, containerItem.target.prototype, propertyKey) || [];
    paramsIndexs.forEach((i) => (param[i] = option.params));

    const headersIndexs: number[] = Reflect.getMetadata(INFO_WATERMARK.HEADERS, containerItem.target.prototype, propertyKey) || [];
    headersIndexs.forEach((i) => (param[i] = option.headers));

    const cookiesIndexs: number[] = Reflect.getMetadata(INFO_WATERMARK.COOKIES, containerItem.target.prototype, propertyKey) || [];
    cookiesIndexs.forEach((i) => (param[i] = option.cookies));

    const ipIndexs: number[] = Reflect.getMetadata(INFO_WATERMARK.IP, containerItem.target.prototype, propertyKey) || [];
    ipIndexs.forEach((i) => (param[i] = option.ip));

    const ipsIndexs: number[] = Reflect.getMetadata(INFO_WATERMARK.IPS, containerItem.target.prototype, propertyKey) || [];
    ipsIndexs.forEach((i) => (param[i] = option.ips));

    return param;
  }

  private initMethod(controllerPath: string, containerItem: INailyContainer, watermark: HttpMethod, propertyKey: string | symbol) {
    const path: string = Reflect.getMetadata(watermark, containerItem.target.prototype, propertyKey);
    if (!path) return;
    const fullPath = NailyWeb.uriJoin(controllerPath, path);
    this.adapter.handler(fullPath, watermark, (req, res, next, option) => {
      const method: Function = containerItem.newed[propertyKey];
      const param = [...this.initParameter(containerItem, propertyKey, option)];
      return method.call(containerItem.newed, ...param);
    });
  }
}
