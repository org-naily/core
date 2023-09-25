import { TRACE_WATERMARK } from "../../constant/constant";

export function Trace(path: string = "/"): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(TRACE_WATERMARK, path, target, propertyKey);
  };
}
