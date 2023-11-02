import { NailyIocWatermark } from "../constants";
import { InjectableOptions, NToken, Type } from "../typings";
import { generateToken } from "../utils/generate";

export function Injectable(options: InjectableOptions): ClassDecorator;
export function Injectable(token?: NToken): ClassDecorator;
export function Injectable(tokenorOptions: NToken | InjectableOptions = generateToken()) {
  return (target: Type) => {
    Reflect.defineMetadata(
      NailyIocWatermark.INJECTABLE,
      {
        token: tokenorOptions ? tokenorOptions : generateToken(),
        ...(tokenorOptions && typeof tokenorOptions === "object" ? tokenorOptions : {}),
      },
      target,
    );
  };
}
