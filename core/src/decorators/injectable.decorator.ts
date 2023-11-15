import "reflect-metadata";
import { NIOC, Type } from "@/typings";
import { NailyWatermark, ScopeEnum } from "@/constants";
import { generateToken } from "@/utils/generate";

export function Injectable(injectableOptions?: Partial<NIOC.InjectableOptions>): ClassDecorator;
export function Injectable(injectableOptions: Partial<NIOC.InjectableOptions> = { token: generateToken(), scope: ScopeEnum.SINGLETON }) {
  if (!injectableOptions.token) injectableOptions.token = generateToken();
  if (!injectableOptions.scope) injectableOptions.scope = ScopeEnum.SINGLETON;

  return (target: Type) => {
    Reflect.defineMetadata(NailyWatermark.INJECTABLE, injectableOptions, target);
  };
}
