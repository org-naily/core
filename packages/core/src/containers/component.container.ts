import { WATERMARK } from "../constants/watermark.constant";
import { Type, NailyLifeCircle, RxType } from "../typings";
import { ContainerImpl, IRxContainer, IRxContainerBase } from "../typings/container.typing";
import { CheckerUtils } from "../utils";
import { InjectableContainer } from "./injectable.container";

export class ComponentContainer implements ContainerImpl {
  private static readonly componentContainer: IRxContainer = {};

  public static getAll(): IRxContainer {
    return ComponentContainer.componentContainer;
  }

  public static forEach(callback: (item: IRxContainerBase, index: string) => void): void {
    for (const item in ComponentContainer.componentContainer) {
      callback(ComponentContainer.componentContainer[item], item);
    }
  }

  public static getOneByKey(key: string): IRxContainerBase {
    return ComponentContainer.componentContainer[key];
  }

  private signInjectable(id: string, metadata: IComponent, name: string) {
    if (!metadata.providers) return;
    metadata.providers.forEach((provider) => {
      Reflect.defineMetadata(WATERMARK.COMPONENT_ID, id, provider);
    });

    InjectableContainer.forEach((provider) => {
      // 获取到当前组件的组件ID
      const componentID = Reflect.getMetadata(WATERMARK.COMPONENT_ID, provider.target);
      // 如果当前组件ID不存在，则不进行检验
      if (!componentID) return;
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
        if (!propertyClassComponentID || propertyClassComponentID !== id) throw new Error(`${propertyClass.name} is not in ${name} component.`);
      });
    });
  }

  public create(target: RxType<NailyLifeCircle>): void {
    const componentMetadata: IComponent = Reflect.getMetadata(WATERMARK.COMPONENT, target);
    if (!componentMetadata || !componentMetadata.id) throw new Error(`${target.name} is not a component.`);
    this.signInjectable(componentMetadata.id, componentMetadata, target.name);
    const newed = new target();
    ComponentContainer.componentContainer[componentMetadata.id] = {
      target: target,
      newed: newed,
    };
  }
}
