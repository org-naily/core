import { NailyUtil } from "../../utils/index";
import { Type } from "../../typings/index.js";
import { NailyIOCWatermark } from "../../constants/index.js";
import { NailyInjectableContext } from "../..";

export function Token(token: string) {
  return (target: Type) => {
    const old_token = Reflect.getMetadata(NailyIOCWatermark.INJECTABLE, target);
    if (!old_token) throw new SyntaxError(`${target.name} is not a Injectable class.`);
    NailyInjectableContext.get(old_token);
    Reflect.defineMetadata(NailyIOCWatermark.INJECTABLE, token, target);
    NailyInjectableContext.delete(old_token);
    NailyInjectableContext.add(target);
  };
}

export function Injectable(target: Type) {
  Reflect.defineMetadata(NailyIOCWatermark.INJECTABLE, NailyUtil.generate_key(), target);
  NailyInjectableContext.add(target);
}
