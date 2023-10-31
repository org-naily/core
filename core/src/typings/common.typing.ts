import { Scope } from "../constants/watermark.constant";
import { NContainer } from "./container.typing";

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
export interface RxType<T = any> extends Function {
  new (): T;
}
export interface NLifeCycle {
  beforeInit?(): Promise<void> | void;
  afterInit?(): Promise<void> | void;
}
export interface NLifeCycle extends Object {}
export interface NActionHost {
  getToken(): string | symbol;
  getParamTypes(): Type<NLifeCycle>[];
  getParams(): NLifeCycle[];
  getPrototypeOwnKeys(): (string | symbol)[];
  getStaticOwnKeys(): (string | symbol)[];
  getAllActions(): RxType<NAction>[];
  getAllActionInstances(): NAction[];
  getScope(): Scope;
}
export interface NBeforeActionHost extends NActionHost {
  setTarget(newTarget: Type<NLifeCycle>): void;
  setParams(newParams: any[]): void;
}
export interface NAfterActionHost extends NActionHost {
  getInstanceOwnKeys: () => (string | symbol)[];
  setInstance<Instance = NLifeCycle>(newInstance: Instance): void;
}
export interface NAfterAction {
  target: Type<NLifeCycle>;
  instance: NLifeCycle;
}
export interface NAction {
  beforeAction?<T = Type<NLifeCycle>>(target: T, host: NBeforeActionHost): void;
  afterAction?<T = Type<NLifeCycle>>(target: T, instance: NLifeCycle, host: NAfterActionHost): void;
}
export interface NAction extends Object {}
export interface NPlugin {
  install(container: NContainer): void;
}
export interface NPlugin extends Object {}
