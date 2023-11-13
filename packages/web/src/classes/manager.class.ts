import { NailyWebWatermark } from "@/constants";
import { NailyWebException } from "@/errors";
import { NWeb } from "@/typings/common.typing";
import { Injectable, NContainer, NToken, NailyInjectableManager, NailyLogger, Type } from "@naily/core";

@Injectable()
export class NailyWebManager {
  public static getAllControllers() {
    const newMap = new Map<NToken, NContainer.ClassElement>();

    NailyInjectableManager.getMap().forEach((value, key) => {
      if (value.type !== "class") return;
      const controllerMetadata: NWeb.NControllerMetadata = Reflect.getMetadata(NailyWebWatermark.CONTROLLER, value.target);
      if (!controllerMetadata) return;
      if (value.isConfiguration === false) return;
      new NailyLogger().log(`[Web] Found controller: ${value.target.name}`);
      newMap.set(key, value);
    });

    return Array.from(newMap.values());
  }

  public static getControllerMetadataOrThrow(target: Type): NWeb.NControllerMetadata {
    const metadata = Reflect.getMetadata(NailyWebWatermark.CONTROLLER, target);
    if (!metadata) throw new NailyWebException(`[Web] Controller metadata is not defined.`);
    return metadata;
  }

  public static getAllAdvicers() {
    const newMap = new Map<NToken, NContainer.ClassElement>();

    NailyInjectableManager.getMap().forEach((value, key) => {
      if (value.type !== "class") return;
      const advicerMetadata = Reflect.getMetadata(NailyWebWatermark.ADVICE, value.target);
      if (!advicerMetadata) return;
      if (value.isConfiguration === false) return;
      new NailyLogger().log(`[Web] Found advicer: ${value.target.name}`);
      newMap.set(key, value);
    });

    return Array.from(newMap.values());
  }
}
