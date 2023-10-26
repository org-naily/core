import { NailyIOCWatermark } from "../constants/watermark.constant";
import { Type } from "../typings/common.typing";
import { FactoryItem } from "../typings/factory.typing";
import * as md5 from "md5";

export abstract class NailyBaseFactory implements $.Impl.Ioc.BaseFactory {
  private readonly container = new Map<string, FactoryItem>();

  public static generateToken(): string {
    return md5(new Date().toISOString() + Math.random().toString());
  }

  public beforeAdd(target: Type, token: string = NailyBaseFactory.generateToken()) {
    Reflect.defineMetadata(NailyIOCWatermark.INJECTABLE, token, target);
  }

  get(token: string) {
    return this.container.get(token);
  }

  getAll() {
    return Array.from(this.container.values());
  }

  getMap() {
    return this.container;
  }

  public remove(token: string) {
    this.container.delete(token);
  }
}
