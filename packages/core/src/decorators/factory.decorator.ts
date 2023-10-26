import { Type } from "../typings/common.typing";
import * as md5 from "md5";
import { isClass } from "is-class";
import { INailyFactory } from "../typings/factory.typing";
import { NailyFactoryConstant } from "../constants";
import { NailyFactoryRepository } from "../factories";

/**
 * [EN]
 * ## Factory
 * It is not real mean factory, it is just a decorate
 *
 * ---
 *
 * [ZH]
 * ## 工厂
 * 这不是真正的工厂，只是一个装饰器
 *
 * ---
 *
 * @author Zero <gczgroup@qq.com>
 * @date 2023/10/24
 * @export
 * @param {Type<INailyFactory.INailyFactoryImpl>} target
 */
export function Factory(target: Type<INailyFactory.INailyFactoryImpl>) {
  console.log(target.name + " is initialized");
}

export function Injectable(key: string = md5(Math.random() + new Date().getTime().toString())) {
  return (target: Type) => {
    Reflect.defineMetadata(NailyFactoryConstant.INJECTABLE, key, target);
    new NailyFactoryRepository().getContext().add(target);
  };
}

export function Inject(val: Type) {
  return (target: Object, key: string | symbol) => {
    target[key] = undefined;
    Reflect.defineMetadata(NailyFactoryConstant.INJECT, val, target, key);
  };
}

export function Autowired(target: Object, key: string | symbol) {
  const typing: Type = Reflect.getMetadata("design:type", target, key);
  if (!isClass(typing)) throw new TypeError(`${typing} is not a class.`);
  Inject(typing)(target, key);
}