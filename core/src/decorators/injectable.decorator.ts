import { NailyFactory } from "..";
import { NailyWatermark, ScopeEnum } from "../constants";
import { NIOC, Type } from "../typings";
import { generateToken } from "../utils/generate";

export function Injectable<T>(injectableOptions: Partial<NIOC.InjectableOptions> = { Scope: ScopeEnum.Singleton, Token: generateToken() }) {
  if (!injectableOptions.Scope) injectableOptions.Scope = ScopeEnum.Singleton;
  if (!injectableOptions.Token) injectableOptions.Token = generateToken();

  return (target: Type<T>) => {
    Reflect.defineMetadata(NailyWatermark.INJECTABLE, injectableOptions, target);
  };
}

export function Configuration(injectableOptions: Partial<NIOC.InjectableOptions> = { Scope: ScopeEnum.Singleton, Token: generateToken() }) {
  return (target: Type) => {
    Injectable(injectableOptions)(target);
    Reflect.defineMetadata(NailyWatermark.CONFIGURATION, true, target);
    target.prototype = new NailyFactory(target).getInstance();
  };
}
