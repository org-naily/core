import { isClass } from "is-class";
import { CheckerUtils } from "../utils";
import { Type } from "../typings";
import { IContainer, IContainerBase } from "../typings/container.typing";
import { WATERMARK } from "../constants/watermark.constant";
import * as jexl from "jexl";
import { join } from "path";
import { readFileSync } from "fs";
import { ConfigurationTool } from "./config.class";

export class InitializeTool {
  constructor(private readonly container: IContainer) {}

  private getOneByKey(key: string): IContainerBase {
    return this.container[key];
  }

  public initParameter(target: Type): object[] {
    const paramMetadata: Type[] = Reflect.getMetadata("design:paramtypes", target) || [];

    const param: object[] = [];
    paramMetadata.forEach((item) => {
      const paramInjectableKey = CheckerUtils.getInjectableKey(item);
      if (!isClass(item) || !paramInjectableKey) {
        throw new Error(`${item.name} is not a @Injectable class. Please check ${target.name}'s parameter`);
      }
      param.push(this.getOneByKey(paramInjectableKey).newed);
    });
    return param;
  }

  public initResource(target: Type, newed: object): void {
    const propertyKeys = CheckerUtils.getPropertyKey(target);
    propertyKeys.forEach((item) => {
      const isInject = Reflect.getMetadata(WATERMARK.INJECT, newed, item);
      if (!isInject) return;
      const paramInjectableKey = CheckerUtils.getInjectableKey(target.prototype[item]);
      if (!paramInjectableKey) throw new Error(`${target.prototype[item].name} is not a @Injectable class.`);
      newed[item] = this.getOneByKey(paramInjectableKey).newed;
    });
  }

  public initValue(target: Type, newed: object) {
    const propertyKeys = CheckerUtils.getPropertyKey(target);
    propertyKeys.forEach((item) => {
      const value: string | true = Reflect.getMetadata(WATERMARK.VALUE, target.prototype, item);
      if (!value) return;
      const res = new ConfigurationTool().getNailyConfiguration();
      newed[item] = value === true ? res : jexl.evalSync(value, res);
    });
  }
}
