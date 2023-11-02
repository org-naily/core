import isClass from "is-class";
import { NailyIocWatermark, Scope } from "../constants";
import { InjectableOptions, NAction, NLifeCycle, NToken, Type } from "../typings";
import { NailyFactory } from "./boostrap.class";

export class InjectableFactory {
  constructor(
    private injectable: Type<NLifeCycle>,
    private readonly container = NailyFactory.container,
  ) {}

  public getToken(): NToken | undefined {
    const data: InjectableOptions = Reflect.getMetadata(NailyIocWatermark.INJECTABLE, this.injectable);
    if (!data) return data;
    return data.token;
  }

  public getTokenOrThrow(): NToken {
    const token = this.getToken();
    if (!token) throw new Error(`Injectable ${this.injectable.name} is not a injectable.`);
    return token;
  }

  public getParamtypes(): any[] {
    return Reflect.getMetadata("design:paramtypes", this.injectable) || [];
  }

  public getParamtypesOrThrow(): Type<NLifeCycle>[] {
    const paramtypes = this.getParamtypes();
    paramtypes.forEach((paramtype) => {
      if (!isClass(paramtype)) throw new TypeError(`Injectable ${this.injectable.name} has a non-class paramtype.`);
    });
    return paramtypes;
  }

  public transformParamtypesOrThrow(): NLifeCycle[] {
    return this.getParamtypesOrThrow().map((paramtype) => new InjectableFactory(paramtype).createInstance());
  }

  public getPrototypeKeys(): (string | symbol)[] {
    return Reflect.ownKeys(this.injectable.prototype).filter((key) => (key === "constructor" ? undefined : key));
  }

  public getStaticKeys(): (string | symbol)[] {
    return Reflect.ownKeys(this.injectable);
  }

  public getScope(): Scope | undefined {
    return Reflect.getMetadata(NailyIocWatermark.SCOPE, this.injectable);
  }

  public getScopeOrThrow(): Scope {
    const scope = this.getScope();
    if (!scope) throw new Error(`Injectable ${this.injectable.name} has no scope.`);
    return scope;
  }

  public getActions(): Type<NAction>[] {
    return Reflect.getMetadata(NailyIocWatermark.ACTION, this.injectable) || [];
  }

  public createInstance(): NLifeCycle {
    const token = this.getTokenOrThrow();
    const paramtypes = this.getParamtypesOrThrow();
    const scope = this.getScopeOrThrow();
    const actions = this.getActions();
    const prototypeKeys = this.getPrototypeKeys();
    const staticKeys = this.getStaticKeys();
    let transformedParameters = this.transformParamtypesOrThrow();

    const actionMap = new Map<Type<NAction>, NAction>();
    actions.forEach((action) => {
      const actionInstance = this.container.getClassByTarget(action).instance;
      actionMap.set(action, actionInstance);
    });

    const commonHost: NAction.CommonHost = {
      getToken: () => token,
      getTarget: () => this.injectable,
      getScope: () => scope,
      getParamTypes: () => paramtypes,
      getActions: () => actions,
      getParams: () => transformedParameters,
      getPrototypeOwnKeys: () => prototypeKeys,
      getStaticOwnKeys: () => staticKeys,
    };

    actionMap.forEach((actionInstance) => {
      if (actionInstance.beforeInit) {
        actionInstance.beforeInit({
          ...commonHost,
          setParams: (newParams) => (transformedParameters = newParams),
          setTarget: (newTarget) => (this.injectable = newTarget),
        });
      }
    });

    let instance = new this.injectable(...transformedParameters);

    actionMap.forEach((actionInstance) => {
      if (actionInstance.afterInit) {
        actionInstance.afterInit({
          ...commonHost,
          getInstance: () => instance,
          setInstance: (newInstance) => (instance = newInstance),
        });
      }
    });

    return instance;
  }
}
