import { Type } from "../../typings";
import { WATERMARK } from "../../constants/watermark.constant";
import { generateKey } from "../../utils/generate";
import { InjectableContainer } from "../../containers/container";

export function Injectable(target: Type) {
  Reflect.defineMetadata(WATERMARK.INJECTABLE, generateKey(), target);
  new InjectableContainer().create(target);
}
