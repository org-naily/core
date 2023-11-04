import { NailyIocWatermark, ScopeOption } from "../constants";
import { NAction, NInjectableOptions, Type } from "../typings";
import { generateToken } from "../utils/generate.util";

export function Injectable(options: NInjectableOptions = { token: generateToken(), scope: ScopeOption.SINGLETON }) {
  return (target: Type) => {
    const option: NInjectableOptions = Reflect.getMetadata(NailyIocWatermark.INJECTABLE, target) || { ...options };
    if (!option.token) option.token = generateToken();
    if (!option.scope) option.scope = ScopeOption.SINGLETON;
    if (!option.actions) option.actions = [];
    Reflect.defineMetadata(NailyIocWatermark.INJECTABLE, option, target);
  };
}

export function UseAction(...actions: Type<NAction>[]) {
  return (target: Type) => {
    const option: NInjectableOptions = Reflect.getMetadata(NailyIocWatermark.INJECTABLE, target) || {};
    if (!option.token) option.token = generateToken();
    if (!option.scope) option.scope = ScopeOption.SINGLETON;
    if (!option.actions) option.actions = actions;
    option.actions = [...option.actions, ...actions];
    Reflect.defineMetadata(NailyIocWatermark.INJECTABLE, option, target);
  };
}

export function Scope(scope: ScopeOption) {
  return (target: Type) => {
    const option: NInjectableOptions = Reflect.getMetadata(NailyIocWatermark.INJECTABLE, target) || {};
    if (!option.token) option.token = generateToken();
    if (!option.actions) option.actions = [];
    option.scope = scope;
    Reflect.defineMetadata(NailyIocWatermark.INJECTABLE, option, target);
  };
}

export function Token(token: string) {
  return (target: Type) => {
    const option: NInjectableOptions = Reflect.getMetadata(NailyIocWatermark.INJECTABLE, target) || {};
    if (!option.token) option.token = token;
    if (!option.actions) option.actions = [];
    if (!option.scope) option.scope = ScopeOption.SINGLETON;
    Reflect.defineMetadata(NailyIocWatermark.INJECTABLE, option, target);
  };
}
