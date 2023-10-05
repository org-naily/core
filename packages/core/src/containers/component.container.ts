import { WATERMARK } from "../constants/watermark.constant";
import { Type, NailyLifeCircle, RxType } from "../typings";
import { ContainerImpl, IRxContainer, IRxContainerBase } from "../typings/container.typing";

export class ComponentContainer implements ContainerImpl {
  private static readonly componentContainer: IRxContainer = {};

  public getAll(): IRxContainer {
    return ComponentContainer.componentContainer;
  }

  public forEach(callback: (item: IRxContainerBase, index: string) => void): void {
    for (const item in ComponentContainer.componentContainer) {
      callback(ComponentContainer.componentContainer[item], item);
    }
  }

  public getOneByKey(key: string): IRxContainerBase {
    return ComponentContainer.componentContainer[key];
  }

  public create(target: RxType<NailyLifeCircle>): void {
    const componentKey: string = Reflect.getMetadata(WATERMARK.COMPONENT, target);
    if (!componentKey) throw new Error(`${target.name} is not a component.`);
    const newed = new target();
    ComponentContainer.componentContainer[componentKey] = {
      target: target,
      newed: newed,
    };
  }
}
