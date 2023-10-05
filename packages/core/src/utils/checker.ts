import { Type } from "../typings";
import { WATERMARK } from "../constants/watermark.constant";

export class CheckerUtils {
  /**
   * Get injectable key by class
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/04
   * @static
   * @param {Type} target
   * @return {void}
   * @memberof CheckerUtils
   */
  public static getInjectableKey(target: Type): string | undefined {
    return Reflect.getMetadata(WATERMARK.INJECTABLE, target);
  }

  /**
   * Get injectable property by class
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/05
   * @static
   * @param {Type} target
   * @memberof CheckerUtils
   */
  public static getPropertyKey(target: Type) {
    return Reflect.ownKeys(target.prototype).filter((item) => (item === "constructor" ? undefined : item));
  }
}
