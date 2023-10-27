import { NailyFactoryContext, createClassDecorator } from "@naily/ioc";
import { NailyWebFactoryContext } from "../factories/web.factory";
import { NailyWebWatermark } from "../constants/watermark.constant";

export function Controller(path: string = "/", token?: string) {
  return createClassDecorator(
    [NailyFactoryContext, NailyWebFactoryContext],
    (target) => {
      Reflect.defineMetadata(NailyWebWatermark.CONTROLLER, path ? path : "/", target);
    },
    token
  );
}
