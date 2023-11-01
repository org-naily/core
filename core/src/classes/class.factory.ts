import { NailyIocWatermark, Scope } from "../constants/watermark.constant";
import { NAction, NConfiguration, NContainer, NLifeCycle, RxType, Type } from "../typings";
import * as jexl from "jexl";

export class NailyClassFactory {
  constructor(private readonly container: NContainer) {}

  public transformParamTypes(param: Type[]): Object[] {
    return param.map((typing) => {
      const token: string | symbol | undefined = Reflect.getMetadata(NailyIocWatermark.INJECTABLE, typing);
      if (!token) throw new Error(`Cannot find token for ${typing.name}`);
      const element = this.container.getElementByTargetOrThrow(typing);
      if (element.type !== "class") throw new TypeError(`Cannot inject class ${typing.name}`);
      const scope = NailyClassFactory.getClassScope(typing);
      if (scope === Scope.TRANSIENT) {
        const instance = new NailyClassFactory(this.container).getClassInstance(typing);
        this.container.changeClassInstance(token, instance);
        return instance;
      }
      return element.instance;
    });
  }

  public transformInstanceToProxy<Instance extends NLifeCycle>(instance: Instance, target: Type): Instance {
    return new Proxy(instance, {
      get: (_target, p) => this.getClassInstance(target)[p],
    });
  }

  public static getClassActions(target: Type): RxType<NAction>[] {
    return Reflect.getMetadata(NailyIocWatermark.ACTION, target) || [];
  }

  public static getClassDesignTypes(target: Type): Type[] {
    return Reflect.getMetadata("design:paramtypes", target) || [];
  }

  public static getClassToken(target: Type): string | symbol {
    const token = Reflect.getMetadata(NailyIocWatermark.INJECTABLE, target);
    if (!token) throw new Error(`Cannot find token for ${target.name}`);
    return token;
  }

  public static getPrototypeOwnKeys(target: Type): (string | symbol)[] {
    return Reflect.ownKeys(target.prototype).filter((key) => (key === "constructor" ? undefined : key));
  }

  public static getClassScope(target: Type): Scope {
    const scope = Reflect.getMetadata(NailyIocWatermark.SCOPE, target);
    if (!scope) throw new Error(`Cannot find scope for ${target.name}`);
    return scope;
  }

  private initConfiguration(instance: Object, prototypeKeys: (string | symbol)[]) {
    for (const key of prototypeKeys) {
      const valueMeta: { jexl: string; configure: RxType<NConfiguration> } = Reflect.getMetadata(NailyIocWatermark.VALUE, instance, key);
      if (!valueMeta) continue;
      const config = new valueMeta.configure();
      const context = config.getConfigure();
      const value = jexl.evalSync(valueMeta.jexl, context);
      instance[key] = value;
    }
  }

  public getClassInstance(target: Type<NLifeCycle>): NLifeCycle {
    const paramTypes = NailyClassFactory.getClassDesignTypes(target);
    const actions = NailyClassFactory.getClassActions(target);
    const token = NailyClassFactory.getClassToken(target);
    let params = this.transformParamTypes(paramTypes);
    const scope = NailyClassFactory.getClassScope(target);

    const actionContainer = new Map<Type<NAction>, NAction>();
    actions.forEach((action) => actionContainer.set(action, new action()));

    for (const action of actionContainer.values()) {
      if (action.beforeAction) {
        action.beforeAction(target, {
          getToken: () => token,
          getParamTypes: () => paramTypes,
          getParams: () => params,
          getScope: () => scope,
          getAllActions: () => actions,
          getPrototypeOwnKeys: () => Reflect.ownKeys(target.prototype),
          getStaticOwnKeys: () => Reflect.ownKeys(target),
          getAllActionInstances: () => Array.from(actionContainer.values()),
          setTarget: (newTarget) => (target = newTarget),
          setParams: (newParams) => (params = newParams),
        });
      }
    }

    let instance = new target(...params);
    this.initConfiguration(
      instance,
      Reflect.ownKeys(target.prototype).filter((key) => (key === "constructor" ? undefined : key))
    );

    for (const action of actionContainer.values()) {
      if (action.afterAction) {
        action.afterAction(target, instance, {
          getToken: () => token,
          getParamTypes: () => paramTypes,
          getParams: () => params,
          getScope: () => scope,
          getAllActions: () => actions,
          getPrototypeOwnKeys: () => Reflect.ownKeys(target.prototype),
          getStaticOwnKeys: () => Reflect.ownKeys(target),
          getInstanceOwnKeys: () => Reflect.ownKeys(instance),
          getAllActionInstances: () => Array.from(actionContainer.values()),
          setInstance: (newInstance) => (instance = newInstance),
        });
      }
    }

    return instance;
  }
}
