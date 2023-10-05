import { WATERMARK } from "../../constants/watermark.constant";

/**
 * [ZH] 注入配置值 支持EL表达式语法
 *
 * [EN] Inject configuration value. Support EL expression syntax.
 *
 * @author Zero <gczgroup@qq.com>
 * @date 2023/10/06
 * @export
 * @param {string} val
 * @return {*}  {PropertyDecorator}
 */
export function Value(val: string | true = true): PropertyDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(WATERMARK.VALUE, val, target, propertyKey);
    target[propertyKey] = val;
  };
}
