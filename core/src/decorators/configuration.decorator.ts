import { NailyFactory } from "../classes";
import { NailyIocWatermark } from "../constants/watermark.constant";
import { NConfiguration, RxType } from "../typings";

export function Configuration(token?: string) {
  return (target: RxType<NConfiguration>) => {
    Reflect.defineMetadata(NailyIocWatermark.CONFIGURATION, true, target);
    NailyFactory.NailyContainer.addConfiguration(target, token);
  };
}
