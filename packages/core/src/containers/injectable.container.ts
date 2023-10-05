import { NailyLifeCircle, Type } from "../typings";
import { isClass } from "is-class";
import { CheckerUtils } from "../utils";
import { WATERMARK } from "../constants/watermark.constant";
import { ContainerImpl, IContainer, IContainerBase } from "../typings/container.typing";
import { InitializeTool } from "../classes/initialize.class";

export class InjectableContainer implements ContainerImpl {
  private static readonly injectableContainer: IContainer = {};

  public static getAll(): IContainer {
    return InjectableContainer.injectableContainer;
  }

  public static forEach(callback: (item: IContainerBase, index: string) => void): void {
    for (const item in InjectableContainer.injectableContainer) {
      callback(InjectableContainer.injectableContainer[item], item);
    }
  }

  public static getOneByKey(key: string): IContainerBase {
    return InjectableContainer.injectableContainer[key];
  }

  public create(target: Type<NailyLifeCircle>): void {
    // 初始化装载工具
    const initializeTool = new InitializeTool(InjectableContainer.injectableContainer);
    // 获取injectable key
    const injectableKey = CheckerUtils.getInjectableKey(target);
    // 使用装载工具装载装载constructor parameter
    const param = initializeTool.initParameter(target);
    // 装载好了之后就可以实例化类了
    const newed = new target(...param);
    // 调用生命周期
    if (newed.handleInit) newed.handleInit();
    // 使用装载工具装载@Inject和@Autowried
    initializeTool.initResource(target, newed);
    // 装载配置文件
    initializeTool.initValue(target, newed);
    // 装载到容器
    InjectableContainer.injectableContainer[injectableKey] = {
      target: target,
      newed: newed,
    };
    // 调用生命周期
    if (newed.handleMount) newed.handleMount();
  }
}
