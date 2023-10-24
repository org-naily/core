import { Type } from "../typings/common.typing";
import { INailyFactory } from "../typings/factory.typing";

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
  console.log(target.name);
}
