import { OPTIONS_WATERMARK } from "../../constant/constant";

export function Options(path: string = "/"): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(OPTIONS_WATERMARK, path, target, propertyKey);
  };
}
