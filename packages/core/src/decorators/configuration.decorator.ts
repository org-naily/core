import { Type } from "../typings";
import { Injectable } from "./injectable.decorator";

export function Configuration(key?: string) {
  return (target: Type) => {
    Injectable(key)(target);
  };
}
