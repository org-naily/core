import { Type } from "@naily/ioc";

export interface NAopBeforeMeta<T = Object> {
  getArgs(): any[];
  getArgTypes(): any[];
  getInstance(): Object;
  getTarget(): Type<T>;
  getPropertyKey(): string | symbol;
}

export interface NAopAfterMeta<T = Object> extends NAopBeforeMeta<T> {
  getReturnValue(): any;
  getReturnTypes(): any;
}
