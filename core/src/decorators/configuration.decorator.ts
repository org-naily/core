import { Injectable, NIOC, NailyFactory, Type } from "..";

export function Configuration(injectableOptions: NIOC.InjectableOptions): ClassDecorator;
export function Configuration(target: Type): void;
export function Configuration(injectableOptionsOrTarget: NIOC.InjectableOptions | Type) {
  if (typeof injectableOptionsOrTarget === "function") {
    Injectable()(injectableOptionsOrTarget);
    injectableOptionsOrTarget.prototype = new NailyFactory(injectableOptionsOrTarget).create();
  } else {
    return (target: Type) => {
      Injectable(injectableOptionsOrTarget)(target);
      target.prototype = new NailyFactory(target).create();
    };
  }
}
