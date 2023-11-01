import { Class, NLifeCycle, NToken, Type } from "@naily/core";
import { Scope } from "@naily/core/dist/constants/watermark.constant";
import { NailyWebWatermark } from "../constants/warermark.constant";

export function Controller(path: string = "/", token?: NToken, scope: Scope = Scope.SINGLETON) {
  return (target: Type<NLifeCycle>) => {
    Reflect.defineMetadata(NailyWebWatermark.CONTROLLER, path, target);
    Class(token, scope)(target);
  };
}

export function Pipe(token?: NToken, scope: Scope = Scope.SINGLETON) {
  return (target: Type<NLifeCycle>) => {
    Class(token, scope)(target);
  };
}
