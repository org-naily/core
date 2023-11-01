import { join } from "path";

export function translatePath(controllerPath: string, methodPath: string) {
  return join("/" + controllerPath, methodPath).replace(/\\/g, "/");
}
