import { InitializeTool } from "../classes/initialize.class";
import { WATERMARK } from "../constants/watermark.constant";
import { Type, NailyLifeCircle, RxType } from "../typings";
import { ContainerImpl, IRxContainer, IRxContainerBase } from "../typings/container.typing";

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

  private signInjectable(id: string, metadata: IComponent, componentName: string) {
    if (!metadata.providers) return;
    // 给当前组件的所有依赖注入的类添加组件ID标记
    metadata.providers.forEach((provider) => {
      Reflect.defineMetadata(WATERMARK.COMPONENT_ID, id, provider);
    });
    InitializeTool.initComponentCheck(id, componentName);
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
