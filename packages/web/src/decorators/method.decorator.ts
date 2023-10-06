import { WEBWATERMARK } from "../constants/watermark.constant";

export function Get(path = "/"): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(WEBWATERMARK.GET, path, target, propertyKey);
  };
}

export function Post(path = "/"): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(WEBWATERMARK.POST, path, target, propertyKey);
  };
}

export function Put(path = "/"): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(WEBWATERMARK.PUT, path, target, propertyKey);
  };
}

export function Delete(path = "/"): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(WEBWATERMARK.DELETE, path, target, propertyKey);
  };
}

export function Patch(path = "/"): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(WEBWATERMARK.PATCH, path, target, propertyKey);
  };
}

export function Options(path = "/"): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(WEBWATERMARK.OPTIONS, path, target, propertyKey);
  };
}

export function Head(path = "/"): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(WEBWATERMARK.HEAD, path, target, propertyKey);
  };
}
