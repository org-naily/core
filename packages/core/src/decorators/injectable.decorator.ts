import { NailyRegistry } from "../classes";
import { NailyFactory } from "../classes/factory.class";
import { NailyWatermark } from "../constants";
import { Type } from "../typings";
import { Bean } from "./bean.decorator";

function applyInjectable(target: Type, options: Partial<NIOC.InjectableMeta> = { Rebind: true }) {
  if (options.Rebind === undefined || options.Rebind === null) options.Rebind = true;
  Bean({
    Scope: options.Scope,
    Token: options.Token,
    Initialize: options.Initialize,
  })(target);
  if (options.Rebind) {
    const oldMetadata: NIOC.Metadata = Reflect.getMetadata(NailyWatermark.INJECTABLE, target) || {};
    Reflect.defineMetadata(NailyWatermark.INJECTABLE, { ...oldMetadata, ...options }, target);
    if (oldMetadata.Token) NailyRegistry.map.delete(oldMetadata.Token);
  }
}

export function Injectable(options?: Partial<NIOC.InjectableMeta>): ClassDecorator;
export function Injectable(target: Type): void;
export function Injectable(options: Type | Partial<NIOC.InjectableMeta> = { Rebind: true }) {
  if (typeof options === "function") {
    applyInjectable(options);
  } else {
    return (target: Type) => {
      applyInjectable(target, options);
    };
  }
}

export function Service(options?: Partial<NIOC.InjectableMeta>): ClassDecorator;
export function Service(target: Type): void;
export function Service(options: Type | Partial<NIOC.InjectableMeta> = { Rebind: true }) {
  if (typeof options === "function") {
    applyInjectable(options);
  } else {
    return (target: Type) => {
      applyInjectable(target, options);
    };
  }
}

export function Configuration(options?: Partial<NIOC.ConfigurationMetadata>): ClassDecorator;
export function Configuration(target: Type): void;
export function Configuration(options: Type | Partial<NIOC.ConfigurationMetadata> = { Rebind: true }) {
  if (typeof options === "function") {
    applyInjectable(options, { Initialize: true });
  } else {
    return (target: Type) => {
      applyInjectable(target, { Initialize: true, ...options });
    };
  }
}

export function Aspect(options?: Partial<NIOC.InjectableMeta>): ClassDecorator;
export function Aspect(target: Type<NAOP.Advice>): void;
export function Aspect(options: Type<NAOP.Advice> | Partial<NIOC.InjectableMeta> = { Rebind: true }) {
  if (typeof options === "function") {
    applyInjectable(options);
  } else {
    return (target: Type<NAOP.Advice>) => {
      applyInjectable(target, options);
    };
  }
}
