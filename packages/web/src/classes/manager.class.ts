import { NailyWebWatermark } from "@/constants";
import { NWeb } from "@/typings/common.typing";
import { Injectable, NContainer, NToken, NailyInjectableManager } from "@naily/core";

@Injectable()
export class NailyWebManager {
  public static getAllControllers() {
    const newMap = new Map<NToken, NContainer.ClassElement>();

    NailyInjectableManager.getMap().forEach((value, key) => {
      if (value.type !== "class") return;
      const controllerMetadata: NWeb.NControllerMetadata = Reflect.getMetadata(NailyWebWatermark.CONTROLLER, value.target);
      if (!controllerMetadata) return;
      if (value.isConfiguration === false) return;
      newMap.set(key, value);
    });

    return Array.from(newMap.values());
  }
}
