import { PUT_WATERMARK } from "../../constant/constant";

export function Put(path: string = "/"): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(PUT_WATERMARK, path, target, propertyKey);
  };
}
