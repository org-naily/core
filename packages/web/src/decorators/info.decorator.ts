import { WEBWATERMARK } from "../constants/watermark.constant";

export function Param() {
  return (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number): void => {
    Reflect.defineMetadata(WEBWATERMARK.PARAM, parameterIndex, target, propertyKey);
  };
}

export function Query() {
  return (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number): void => {
    Reflect.defineMetadata(WEBWATERMARK.QUERY, parameterIndex, target, propertyKey);
  };
}

export function Body() {
  return (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number): void => {
    Reflect.defineMetadata(WEBWATERMARK.BODY, parameterIndex, target, propertyKey);
  };
}

export function Headers() {
  return (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number): void => {
    Reflect.defineMetadata(WEBWATERMARK.HEADERS, parameterIndex, target, propertyKey);
  };
}

export function Cookies() {
  return (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number): void => {
    Reflect.defineMetadata(WEBWATERMARK.COOKIES, parameterIndex, target, propertyKey);
  };
}

export function Ip() {
  return (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number): void => {
    Reflect.defineMetadata(WEBWATERMARK.IP, parameterIndex, target, propertyKey);
  };
}
