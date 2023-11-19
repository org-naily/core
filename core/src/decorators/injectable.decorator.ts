import { NailyFactory } from "..";
import { NailyWatermark, ScopeEnum } from "../constants";
import { Type } from "../typings";
import { generateToken } from "../utils/generate";

export function Injectable<T>(injectableOptions: Partial<NIOC.InjectableOptions> = { Scope: ScopeEnum.Singleton, Token: generateToken() }) {
  if (!injectableOptions.Scope) injectableOptions.Scope = ScopeEnum.Singleton;
  if (!injectableOptions.Token) injectableOptions.Token = generateToken();

  return (target: Type<T>) => {
    Reflect.defineMetadata(NailyWatermark.INJECTABLE, injectableOptions, target);
  };
}

export function Service<T>(injectableOptions: Partial<NIOC.InjectableOptions> = { Scope: ScopeEnum.Singleton, Token: generateToken() }) {
  return (target: Type<T>) => Injectable(injectableOptions)(target);
}

export function Configuration(injectableOptions: Partial<NIOC.InjectableOptions> = { Scope: ScopeEnum.Singleton, Token: generateToken() }) {
  return (target: Type) => {
    Reflect.defineMetadata(NailyWatermark.CONFIGURATION, true, target);
    Injectable(injectableOptions)(target);

    target.prototype = new NailyFactory(target).getInstance();
  };
}

export function Component(componentOptions: Partial<NIOC.ComponentOptions> = { Imports: [], Exports: [], Providers: [] }) {
  if (!componentOptions.Providers) componentOptions.Providers = [];
  if (!componentOptions.Imports) componentOptions.Imports = [];
  if (!componentOptions.Exports) componentOptions.Exports = [];

  return (target: Type) => {
    Reflect.defineMetadata(
      NailyWatermark.COMPONENT,
      { Imports: componentOptions.Imports, Exports: componentOptions.Exports, Providers: componentOptions.Providers },
      target,
    );
    Configuration(componentOptions)(target);
  };
}
