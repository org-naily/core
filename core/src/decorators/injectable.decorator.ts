import { NailyFactory } from "../classes/boostrap.class";
import { InjectableFactory } from "../classes/injectable.class";
import { NailyIocWatermark, Scope } from "../constants";
import { InjectableOptions, NAction, NLifeCycle, NToken, Type } from "../typings";
import { generateToken } from "../utils/generate";

export function Injectable(options: InjectableOptions): ClassDecorator;
export function Injectable(token?: NToken): ClassDecorator;
export function Injectable(tokenorOptions: NToken | InjectableOptions = generateToken()) {
  return (target: Type<NLifeCycle>) => {
    const options: InjectableOptions = {
      token: tokenorOptions && (typeof tokenorOptions === "string" || typeof tokenorOptions === "symbol") ? tokenorOptions : generateToken(),
      ...(tokenorOptions && typeof tokenorOptions === "object" ? tokenorOptions : {}),
    };

    Reflect.defineMetadata(NailyIocWatermark.INJECTABLE, options, target);
    Reflect.defineMetadata(NailyIocWatermark.SCOPE, options.scope || Scope.SINGLETON, target);

    const instance = new InjectableFactory(target).createInstance();
    if (instance.onInit) instance.onInit();
    NailyFactory.container.addClass(options.token as NToken, target, instance);
  };
}

export function UseAction(...actions: Type<NAction>[]) {
  return (target: Type<NLifeCycle>) => {
    Reflect.defineMetadata(NailyIocWatermark.ACTION, [...actions], target);
    Injectable()(target);
  };
}
