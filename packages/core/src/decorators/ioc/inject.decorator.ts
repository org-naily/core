import { isClass } from "is-class";
import { Type } from "../../typings";
import { WATERMARK } from "../../constants/watermark.constant";

/**
 * Inject a injectable class
 *
 * @author Zero <gczgroup@qq.com>
 * @date 2023/10/04
 * @export
 * @template T
 * @param {T} value
 * @return {*}  {PropertyDecorator}
 */
export function Inject<T extends Type>(value: T): PropertyDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(WATERMARK.INJECT, value, target, propertyKey);
    target[propertyKey] = value;
  };
}

/**
 * Auto inject a injectable class
 *
 * @author Zero <gczgroup@qq.com>
 * @date 2023/10/04
 * @export
 * @param {Object} target
 * @param {(string | symbol)} propertyKey
 */
export function Autowired(target: Object, propertyKey: string | symbol) {
  const propertyType: Type = Reflect.getMetadata("design:type", target, propertyKey);
  if (!propertyType || !isClass(propertyType)) throw new Error("@Autowired's property must be declare a class");
  Inject(propertyType)(target, propertyKey);
}
