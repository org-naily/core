import { WATERMARK } from "../constants/watermark.constant";
import { Type } from "../typings";
import { NailyComponent } from "../vendors/component.class";
import { Injectable } from "./injectable.decorator";

declare global {
  interface INailyComponent {
    key?: string;
    providers?: Type[];
  }
}

export function Component(metadata: INailyComponent) {
  return (target: Type) => {
    Injectable(metadata.key)(target);
    Reflect.defineMetadata(WATERMARK.COMPONENT, metadata, target);
    NailyComponent.add(target);
  };
}
