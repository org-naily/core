import { NailyIOCWatermark } from "../constants/watermark.constant";
import { Type } from "../typings/common.typing";
import { isClass } from "is-class";
import { FactoryItem } from "../typings/factory.typing";
import * as md5 from "md5";

export abstract class NailyBaseFactory implements $.Impl.Ioc.BaseFactory {
  protected readonly container = new Map<string, FactoryItem>();

  public static generateToken(): string {
    return md5(new Date().toISOString() + Math.random().toString());
  }

  protected beforeAdd(target: Type, token: string = NailyBaseFactory.generateToken()) {
    Reflect.defineMetadata(NailyIOCWatermark.INJECTABLE, token, target);
  }

  /**
   * Analyze constructor parameters
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/27
   * @protected
   * @param {Type} target
   * @return {Object[]}
   * @memberof NailyBaseFactory
   */
  protected analyzeConstructorParameters(target: Type): Object[] {
    const paramTypes: Type[] = Reflect.getMetadata("design:paramtypes", target) || [];
    const designTypes: Object[] = [];
    paramTypes.forEach((paramType, index) => {
      const paramItemToken: string = Reflect.getMetadata(NailyIOCWatermark.INJECTABLE, paramType);
      if (typeof paramType !== "function" || !isClass(paramType)) {
        throw new TypeError(`Invalid type of parameter: ${paramType}. Expected class.`);
      }
      if (!paramItemToken) throw new TypeError(`Class ${paramType.name} is not injectable.`);
      const paramItem = this.get(paramItemToken);
      if (!paramItem) throw new TypeError(`Class ${paramType.name} is not registered.`);
      designTypes[index] = paramItem.instance;
    });
    return designTypes;
  }

  protected analyzePropertyParameters(target: Type, instance: Object) {
    const ownKeys = Reflect.ownKeys(target.prototype) || [];
    for (let i = 0; i < ownKeys.length; i++) {
      const item = ownKeys[i];
      const injectMeta: Type = Reflect.getMetadata(NailyIOCWatermark.INJECT, target.prototype, item);
      if (!injectMeta) continue;
      const token = Reflect.getMetadata(NailyIOCWatermark.INJECTABLE, injectMeta);
      if (!token) continue;
      const childrenInstance = this.get(token);
      instance[item] = childrenInstance.instance;
    }
  }

  public get(token: string) {
    return this.container.get(token);
  }

  public getAll() {
    return Array.from(this.container.values());
  }

  public getMap() {
    return this.container;
  }

  public rawAdd(token: string, target: Type, instance: Object): void {
    this.container.set(token, { target, instance });
  }

  public remove(token: string) {
    this.container.delete(token);
  }
}
