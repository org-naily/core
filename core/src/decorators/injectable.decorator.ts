import "reflect-metadata";
import { NInjectableOptions, Scope, Type } from "../typings/common.typing";
import { generateToken } from "../utils/generateToken";
import { NailyIOCWatermark } from "../constants/watermark.constant";
import { NailyFactoryContext } from "../containers";
import { createFactoryClassDecorator } from "../utils";

export function Injectable(token: string, scope?: Scope): ClassDecorator;
export function Injectable(options?: NInjectableOptions): ClassDecorator;
export function Injectable(scope?: Scope, token?: string): ClassDecorator;
export function Injectable(param1: string | NInjectableOptions = { token: generateToken(), scope: Scope.Singleton }, param2: Scope = Scope.Singleton) {
  if (!param1 || typeof param1 === "object") {
    if (!param1) param1 = { token: generateToken(), scope: Scope.Singleton };
    if (!(param1 as NInjectableOptions).token) (param1 as NInjectableOptions).token = generateToken();
    if (!(param1 as NInjectableOptions).scope) (param1 as NInjectableOptions).scope = Scope.Singleton;

    return createFactoryClassDecorator({
      factories: [NailyFactoryContext],
      token: (param1 as NInjectableOptions).token,
      type: "class",
      beforeExecute(target: Type) {
        Reflect.defineMetadata(NailyIOCWatermark.INJECTABLE, (param1 as NInjectableOptions).token, target);
        Reflect.defineMetadata(NailyIOCWatermark.SCOPE, (param1 as NInjectableOptions).scope, target);
      },
    });
  } else if (param1 === Scope.Singleton || param1 === Scope.Transient) {
    return createFactoryClassDecorator({
      factories: [NailyFactoryContext],
      token: generateToken(),
      type: "class",
      beforeExecute(target) {
        Reflect.defineMetadata(NailyIOCWatermark.INJECTABLE, generateToken(), target);
        Reflect.defineMetadata(NailyIOCWatermark.SCOPE, param1, target);
      },
    });
  } else if (typeof param1 === "string") {
    return createFactoryClassDecorator({
      factories: [NailyFactoryContext],
      token: param1 ? param1 : generateToken(),
      type: "class",
      beforeExecute(target) {
        Reflect.defineMetadata(NailyIOCWatermark.INJECTABLE, param1 ? param1 : generateToken(), target);
        Reflect.defineMetadata(NailyIOCWatermark.SCOPE, param2, target);
      },
    });
  }
}
