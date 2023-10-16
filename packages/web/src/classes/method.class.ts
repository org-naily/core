import { INailyContainer } from "@naily/core/dist/typings/container.typing";
import { WATERMARK } from "../constants/watermark.constant";
import { IAdapterOptions } from "../typings";
import { join } from "path";

export class NailyWebMethod {
  constructor(private readonly controllerPath: string, private readonly adapter: IAdapterOptions, private readonly item: INailyContainer) {}

  initGET(propertyKey: string | symbol) {
    const getPath: string = Reflect.getMetadata(WATERMARK.GET, this.item.newed, propertyKey);
    if (!getPath) return;
    const urlPath = join("/" + this.controllerPath, getPath).replace(/\\/g, "/");
    this.adapter.handler(urlPath, "get", (req, res, next, option) => {
      return this.item.newed[propertyKey]();
    });
  }
}
