import "reflect-metadata";
import { Type } from "../typings";
import { NailyWatermark, Scope } from "../constants";
import { generateToken } from "../utils/generate";
import { NailyFactory } from "../classes/factory.class";

export function Bean(options?: Partial<NIOC.Metadata>): ClassDecorator & PropertyDecorator;
export function Bean(options: Partial<NIOC.Metadata> = {}) {
  if (!options.Token) options.Token = generateToken();
  if (!options.Scope) options.Scope = Scope.SINGLETON;
  if (options.Initialize === undefined || options.Initialize === null) options.Initialize = false;

  return (target: Type | Object, proertyKey?: string | symbol) => {
    if (typeof target === "object" && proertyKey) {
      const oldMetadata: NIOC.Metadata = Reflect.getMetadata(NailyWatermark.INJECTABLE, target.constructor) || options;
      Reflect.defineMetadata(NailyWatermark.INJECTABLE, oldMetadata, target.constructor);
      if (options.Initialize) target.constructor.prototype = new NailyFactory(target.constructor as Type).createInstance();
    } else if (typeof target === "function") {
      const oldMetadata: NIOC.Metadata = Reflect.getMetadata(NailyWatermark.INJECTABLE, target) || options;
      Reflect.defineMetadata(NailyWatermark.INJECTABLE, oldMetadata, target);
      if (options.Initialize) target.prototype = new NailyFactory(target as Type).createInstance();
    } else {
      throw new TypeError(`The target ${target} is not a class or a object`);
    }
  };
}
