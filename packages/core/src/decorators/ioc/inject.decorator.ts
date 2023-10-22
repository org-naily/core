import { NailyIOCWatermark } from "../../constants/watermark.constant.js";
import { Type } from "../../typings/common.typing.js";

/**
 * Inject a Injectable class
 *
 * @author Zero <gczgroup@qq.com>
 * @date 2023/10/21
 * @export
 * @param {Type} val
 * @return {PropertyDecorator}
 */
export function Inject(val: Type): PropertyDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(NailyIOCWatermark.INJECT, val, target, propertyKey);
    target[propertyKey] = val;
  };
}

/**
 * Auto inject a Injectable class.
 *
 * @author Zero <gczgroup@qq.com>
 * @date 2023/10/21
 * @export
 * @param {Object} target
 * @param {(string | symbol)} propertyKey
 */
export function Autowired(target: Object, propertyKey: string | symbol) {
  const typing = Reflect.getMetadata("design:type", target, propertyKey);
  if (!typing) throw new TypeError(`Cannot resolve type of ${propertyKey.toString()} in ${target.constructor.name}. Please use @Inject.`);
  Inject(typing)(target, propertyKey);
}
