import isClass from "is-class";
import { Injectable } from "@/decorators";
import { Type, NIOC, NConfigure } from "@/typings";
import { NailyFactory, NailyRepository } from "@/classes";

async function Init(target: Type, options?: Partial<NIOC.InjectableOptions>) {
  Injectable(options)(target);

  const Factory = new NailyFactory<NConfigure>(target);
  const instance = Factory.create(true, false);
  target.prototype = instance;

  NailyRepository.set({
    type: "class",
    target: target,
    instance: instance,
    options: Factory.getInjectableOptionsOrThrow(),
  });
}

export function Configuration(injectableOptions?: Partial<NIOC.InjectableOptions>): ClassDecorator;
export function Configuration(target: Type): void;
export function Configuration(injectableOptionsOrTarget: Partial<NIOC.InjectableOptions> | Type = {}) {
  if (isClass(injectableOptionsOrTarget)) {
    Init(injectableOptionsOrTarget);
  } else {
    return (target: Type) => {
      Init(target, injectableOptionsOrTarget);
    };
  }
}
