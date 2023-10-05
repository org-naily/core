import { isClass } from "is-class";
import { CheckerUtils } from "../utils";
import { Type } from "../typings";
import { IContainer, IContainerBase } from "../typings/container.typing";
import { WATERMARK } from "../constants/watermark.constant";
import * as jexl from "jexl";
import { join } from "path";
import { readFileSync } from "fs";
import { ConfigurationTool } from "./config.class";
import { InjectableContainer } from "../containers/injectable.container";

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

  private static initComponentCheckProperty(provider: IContainerBase, id: string, componentName: string) {
    // 获取到当前组件的所有属性
    const propertyKeys = CheckerUtils.getPropertyKey(provider.target);
    // 遍历所有属性
    propertyKeys.forEach((propertyKey) => {
      // 获取到当前属性的注入信息
      const injectMetadata = Reflect.getMetadata(WATERMARK.INJECT, provider.newed, propertyKey);
      // 如果当前属性没有注入信息，则不进行检验
      if (!injectMetadata) return;
      // 获取到当前属性的已经注入的类
      const propertyClass = provider.target.prototype[propertyKey];
      const propertyClassComponentID = Reflect.getMetadata(WATERMARK.COMPONENT_ID, propertyClass);
      if (!propertyClassComponentID || propertyClassComponentID !== id)
        throw new Error(`${propertyClass.name} is not in ${componentName} component.`);
    });
  }

  private static initComponentCheckConstructor(provider: IContainerBase, id: string, componentName: string) {
    // 获取到当前组件的构造函数
    const constructors: Type[] = Reflect.getMetadata("design:paramtypes", provider.target) || [];
    // 遍历构造函数的所有参数
    constructors.forEach((param) => {
      // 获取到当前参数的组件注入信息
      const paramClassComponentID = Reflect.getMetadata(WATERMARK.COMPONENT_ID, param);
      // 如果当前参数没有组件注入信息或组件信息不匹配 则报错
      if (!paramClassComponentID || paramClassComponentID !== id) throw new Error(`${param.name} is not in ${componentName} component.`);
    });
  }

  public static initComponentCheck(id: string, componentName: string) {
    InjectableContainer.forEach((provider) => {
      // 获取到当前组件的组件ID
      const componentID = Reflect.getMetadata(WATERMARK.COMPONENT_ID, provider.target);
      // 如果当前组件ID不存在，则不进行检验
      if (!componentID) return;
      // 检验当前组件的所有属性是否都是当前组件的依赖注入
      this.initComponentCheckProperty(provider, id, componentName);
      this.initComponentCheckConstructor(provider, id, componentName);
    });
  }
}
