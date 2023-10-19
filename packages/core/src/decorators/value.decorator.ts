import { WATERMARK } from "../constants/watermark.constant";
import { NailyConfigure } from "../vendors/configure.class";

export function Value<T extends string>(jexl?: T, dynamic: boolean = false) {
  return (target: Object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(WATERMARK.VALUE, jexl, target, propertyKey);
    target[propertyKey] = dynamic ? NailyConfigure.getConfigureByJexl(jexl) : NailyConfigure.getConfigureByJexlDynamic(jexl);
    Object.defineProperty(target, propertyKey, {
      get: function () {
        return dynamic ? NailyConfigure.getConfigureByJexlDynamic(jexl) : NailyConfigure.getConfigureByJexl(jexl);
      },
      writable: false,
    });
  };
}
