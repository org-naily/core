import { WATERMARK } from "../constants/watermark.constant";
import { Type } from "../typings/common.typing";
import { GenerateKey } from "../utils/generate_key";
import { NailyDependency } from "../vendors/dependency.class";

export function Injectable(key: string = GenerateKey()) {
  return (target: Type) => {
    Reflect.defineMetadata(WATERMARK.INJECTABLE, key, target);
    NailyDependency.add(target);
  };
}
