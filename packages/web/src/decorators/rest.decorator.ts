import { NailyWebMethodConstant } from "../constants";

export function Get(path: string = "/") {
  return (target: Object, key: string | symbol) => {
    Reflect.defineMetadata(NailyWebMethodConstant.GET, path, target, key);
  };
}

export function Post(path: string = "/") {
  return (target: Object, key: string | symbol) => {
    Reflect.defineMetadata(NailyWebMethodConstant.POST, path, target, key);
  };
}
