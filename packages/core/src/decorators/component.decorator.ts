import { Type } from "../typings";

function applyComponent(target: Type, options: Partial<NIOC.ComponentMetadata> = {}) {}

export function Component(target: Type): void;
export function Component(options: Partial<NIOC.ComponentMetadata>): ClassDecorator;
export function Component(options: Type | Partial<NIOC.ComponentMetadata>) {
  if (typeof options === "function") {
    applyComponent(options);
  } else {
    return (target: Type) => {
      applyComponent(target, options);
    };
  }
}
