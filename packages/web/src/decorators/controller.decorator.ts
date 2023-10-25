import { Type } from "@naily/core";
import { NailyWebConstant } from "../constants";

export function Controller(path: string = "/") {
  return (target: Type) => {
    const oldPath = Reflect.getMetadata(NailyWebConstant.CONTROLLER, target);
    if (oldPath) throw new Error(`@Controller only can be used once, please check ${target.name}.`);
    Reflect.defineMetadata(NailyWebConstant.CONTROLLER, path, target);
  };
}
