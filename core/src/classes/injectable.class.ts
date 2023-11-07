import "reflect-metadata";
import { isClass } from "is-class";
import { NAction, NInjectableOptions, Type } from "../typings";
import { NailyInjectableParser } from "./parser.class";
import { NailyIocWatermark } from "../constants";
import { NailyFactory } from "./factory.class";
import { Logger } from "./logger.class";

export class NailyInjectableFactory<Instance> {
  constructor(private target: Type<Instance>) {}

  public getParamtypes(): any[] {
    return Reflect.getMetadata("design:paramtypes", this.target) || [];
  }

  public getParamtypesOrThrow(): Type[] {
    const paramtypes = this.getParamtypes();
    return paramtypes.map((paramtype) => {
      if (!isClass(paramtype)) throw new TypeError(`${paramtype} is no a injectable.`);
      return paramtype;
    });
  }

  public getPrototypeOwnkeys(): (string | symbol)[] {
    return Reflect.ownKeys(this.target.prototype).filter((key) => (key !== "constructor" ? key : undefined));
  }

  public getStaticOwnkeys(): (string | symbol)[] {
    return Reflect.ownKeys(this.target);
  }

  public getParamtypesByPropertykey(key: string | symbol): any[] {
    return Reflect.getMetadata("design:paramtypes", this.target.prototype, key) || [];
  }

  public getMetadata(): NInjectableOptions | undefined {
    return Reflect.getMetadata(NailyIocWatermark.INJECTABLE, this.target);
  }

  public getMetadataOrThrow(): NInjectableOptions {
    const metadata = this.getMetadata();
    if (!metadata) throw new TypeError(`${this.target} is no a injectable.`);
    if (!metadata.actions) throw new TypeError(`${this.target} is no a injectable.`);
    if (!metadata.scope) throw new TypeError(`${this.target} is no a injectable.`);
    if (!metadata.token) throw new TypeError(`${this.target} is no a injectable.`);
    return metadata;
  }

  private getSingletonInstance(): Instance | undefined {
    const classElement = NailyFactory.container.getClassElementByToken<Instance>(this.getMetadataOrThrow().token);
    if (classElement) return classElement.instance;
  }

  public createInstance(singleton: boolean = true): Instance {
    const metadata = this.getMetadataOrThrow();
    const singletonInstance = this.getSingletonInstance();
    if (singleton && singletonInstance) return singletonInstance;

    const paramtypes = this.getParamtypesOrThrow();
    const prototypeKeys = this.getPrototypeOwnkeys();
    const staticKeys = this.getStaticOwnkeys();
    const parameters = new NailyInjectableParser(this.target).transformConstructorParamtypesToInstance();

    const actionInstances = metadata.actions.map((action) => {
      const actionFactory = new NailyInjectableFactory(action);
      return actionFactory.createInstance();
    });

    const common: NAction.Ctx = {
      getMetadata: () => metadata,
      getParamtypes: () => paramtypes,
      getPrototypekeys: () => prototypeKeys,
      getStaticKeys: () => staticKeys,
      getTarget: () => this.target,
    };

    actionInstances.forEach((actionInstance) => {
      actionInstance.whenBeforeCreate({
        ...common,
        setTarget: (newTarget) => (this.target = newTarget),
      });
    });

    let instance = new this.target(...parameters);

    actionInstances.forEach((actionInstance) => {
      actionInstance.whenCreated({
        ...common,
        getInstance: () => instance,
        setInstance: (newInstance) => (instance = newInstance as Instance),
      });
    });

    NailyFactory.container.setClassElement(metadata.token, {
      type: "class",
      target: this.target,
      instance: instance,
    });

    if (metadata.scope === "__singleton__") {
      new Logger().log(`Create singleton instance for ${this.target.name}`);
      return instance;
    } else if (metadata.scope === "__transient__") {
      new Logger().log(`Create transient instance for ${this.target.name}`);

      if (singleton) {
        return new Proxy(instance as Object, {
          get: (_target, key) => {
            return new NailyInjectableFactory(this.target).createInstance(false)[key];
          },
        }) as Instance;
      } else {
        return instance;
      }
    }
  }
}
