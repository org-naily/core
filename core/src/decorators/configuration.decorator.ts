import { generateToken } from "@/utils/generate";
import { NailyInjectableFactory, NailyInjectableManager, NailyWatermark, Type } from "..";

export function Configuration() {
  return (target: Type) => {
    Reflect.defineMetadata(NailyWatermark.CONFIGURATION, true, target);
    NailyInjectableManager.addClassElementOrChange(generateToken(), target, new NailyInjectableFactory(target).create());
  };
}
