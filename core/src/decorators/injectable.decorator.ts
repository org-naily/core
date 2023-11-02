import { NailyIocWatermark } from "../constants";
import { Type } from "../typings";
import { generateToken } from "../utils/generate";

export function Injectable(options: { token: string }): ClassDecorator;
export function Injectable(token?: string): ClassDecorator;
export function Injectable(tokenorOptions: string | { token: string } = generateToken()) {
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
