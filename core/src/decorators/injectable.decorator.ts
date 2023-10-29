import "reflect-metadata";
import { NInjectableOptions, Scope, Type } from "../typings/common.typing";
import { generateToken } from "../utils/generateToken";
import { NailyIOCWatermark } from "../constants/watermark.constant";
import { NailyFactoryContext } from "../containers";
import { createFactoryClassDecorator } from "../utils";

export function Injectable(options: NInjectableOptions = { token: generateToken(), scope: Scope.Singleton }) {
  if (!options.token) options.token = generateToken();
  if (!options.scope) options.scope = Scope.Singleton;

  return createFactoryClassDecorator({
    factories: [NailyFactoryContext],
    token: options.token,
    type: "class",
    beforeExecute(target: Type) {
      Reflect.defineMetadata(NailyIOCWatermark.INJECTABLE, options.token, target);
      Reflect.defineMetadata(NailyIOCWatermark.SCOPE, options.scope, target);
    },
  });
}
