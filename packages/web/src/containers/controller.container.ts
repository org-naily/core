import { INailyContainerImpl, NailyIOCWatermark, NailyInjectableContext, Type } from "@naily/core";
import { NailyContainer } from "@naily/core/dist/containers/abstract.container";

export class NailyAbstractControllerContainer extends NailyContainer implements INailyContainerImpl {
  add(target: Type) {
    const key: string = Reflect.getMetadata(NailyIOCWatermark.INJECTABLE, target);
    const injectableItem = NailyInjectableContext.get(key);
    this.container.set(key, injectableItem);
  }
}
