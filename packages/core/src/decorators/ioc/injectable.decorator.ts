import { Type } from "../../typings";
import { WATERMARK } from "../../constants/watermark.constant";
import { generateKey } from "../../utils/generate";
import { InjectableContainer } from "../../containers/injectable.container";

/**
 * [ZH] 标记类为可注入，并注册到 Naily 容器中。
 *
 * [EN] Injectable decorator. Mark class as injectable and register it to Naily container.
 *
 * @author Zero <gczgroup@qq.com>
 * @date 2023/10/06
 * @export
 * @param {string} [key=generateKey()]
 * @return {ClassDecorator}
 */
export function Injectable(key?: string): ClassDecorator;
export function Injectable(key: string = generateKey()) {
  return (target: Type) => {
    Reflect.defineMetadata(WATERMARK.INJECTABLE, key, target);
    new InjectableContainer().create(target);
  };
}
