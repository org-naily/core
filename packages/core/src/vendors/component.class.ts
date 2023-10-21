import { isClass } from "is-class";
import { WATERMARK } from "../constants/watermark.constant";
import { INailyComponentInit, INailyContainer, Type } from "../typings";
import { NailyDependency } from "./dependency.class";

export class AbstractNailyComponent {
  private readonly container = new Map<string | symbol, INailyContainer>();

  public getAll() {
    return this.container;
  }

  public findOneByKey(key: string) {
    return this.container.get(key);
  }

  public async add(target: Type) {
    const key: string = Reflect.getMetadata(WATERMARK.INJECTABLE, target);
    const targetDependency = NailyDependency.findOneByTarget<INailyComponentInit>(target);
    if (targetDependency.newed.onComponentInit) await targetDependency.newed.onComponentInit();
    this.container.set(key, targetDependency);
    this.analyzeDependency(key, target.name);
  }

  public analyzeDependency(key: string, componentName: string) {
    const target = this.findOneByKey(key);
    if (!target) throw new Error(`Cannot find component with key ${key}`);
    const metadata: Partial<INailyComponent> = Reflect.getMetadata(WATERMARK.COMPONENT, target.target) || {};
    const exports = metadata.exports || [];
    const providers = metadata.providers || [];
    const analyzedProviders = this.analyzeProvider(providers);
    this.analyzeExport(exports, analyzedProviders, componentName);

    analyzedProviders.forEach((providerKey) => {
      const singleProviderTarget = NailyDependency.findOneByKey(providerKey);
      if (!target) throw new Error(`Cannot find provider ${singleProviderTarget.target.name} in naily container.`);

      let isHave = false;
      for (let i = 0; i < providers.length; i++) {
        const sinlgeProviderKey = Reflect.getMetadata(WATERMARK.INJECTABLE, providers[i]);
        if (sinlgeProviderKey === providerKey) {
          isHave = true;
          break;
        }
      }

      if (!isHave) {
        throw new Error(`Cannot find provider ${singleProviderTarget.target.name} in ${componentName} component. Please check your providers.`);
      }
    });
  }

  public analyzeProvider(providers: Type[]) {
    const keys: string[] = [];
    for (let i = 0; i < providers.length; i++) {
      const item = providers[i];
      const key: string = Reflect.getMetadata(WATERMARK.INJECTABLE, item);
      keys.push(key);

      const param: Type[] = Reflect.getMetadata("design:paramtypes", item) || [];
      const parameterParsed = this.parseParameter(param);
      keys.push(...parameterParsed);
      keys.push(...this.parseInject(item));
      keys.push(...this.parseAspect(item));
    }
    return keys;
  }

  public analyzeExport(exports: Type[], providerKeys: string[], componentName: string) {
    const keys: string[] = [];
    for (let i = 0; i < exports.length; i++) {
      const item = exports[i];
      const key: string = Reflect.getMetadata(WATERMARK.INJECTABLE, item);
      if (!key) throw new TypeError(`Export instance ${item.name} not found in Naily container`);
      if (!providerKeys.includes(key)) throw new TypeError(`Export instance ${item.name} not found in ${componentName} providers`);
      keys.push(key);
    }
    return keys;
  }

  protected parseParameter(param: Type[]) {
    const keys: string[] = [];
    for (let i = 0; i < param.length; i++) {
      if (!isClass(param[i])) throw new TypeError("Parameter must be a class");
      const key: string = Reflect.getMetadata(WATERMARK.INJECTABLE, param[i]);
      keys.push(key);

      const childrenParameter: Type[] = Reflect.getMetadata("design:paramtypes", param[i]) || [];
      const parsed = this.parseParameter(childrenParameter);
      parsed.forEach((singleKey) => keys.push(singleKey));
    }
    return keys;
  }

  protected parseInject(target: Type) {
    const keys: string[] = [];
    const propertyMethods: (string | symbol)[] = Reflect.ownKeys(target.prototype).filter((item) => item !== "constructor");
    for (let i = 0; i < propertyMethods.length; i++) {
      const injectTarget: Type = Reflect.getMetadata(WATERMARK.INJECT, target.prototype, propertyMethods[i]);
      if (!injectTarget) continue;
      const key = Reflect.getMetadata(WATERMARK.INJECTABLE, injectTarget);
      if (!key) continue;
      keys.push(key);
    }
    return keys;
  }

  protected parseAspect(target: Type) {
    const keys: string[] = [];
    const propertyMethods: (string | symbol)[] = Reflect.ownKeys(target.prototype).filter((item) => item !== "constructor");

    for (let i = 0; i < propertyMethods.length; i++) {
      // 获取到此方法的前置方法和后置方法
      const befores: Type[] = Reflect.getMetadata(WATERMARK.BEFORE_EXECUTE, target.prototype, propertyMethods[i]) || [];
      const afters: Type[] = Reflect.getMetadata(WATERMARK.AFTER_EXECUTE, target.prototype, propertyMethods[i]) || [];

      // 遍历所有前置方法
      for (let j = 0; j < befores.length; j++) {
        const before = befores[j];
        const singleBeforeKey: string = Reflect.getMetadata(WATERMARK.INJECTABLE, before);
        if (!singleBeforeKey) throw new TypeError(`Before instance ${before.name} not found in Naily container`);
        keys.push(singleBeforeKey);
      }

      // 遍历所有后置方法
      for (let j = 0; j < afters.length; j++) {
        const after = afters[j];
        const singleAfterKey: string = Reflect.getMetadata(WATERMARK.INJECTABLE, after);
        if (!singleAfterKey) throw new TypeError(`After instance ${after.name} not found in Naily container`);
        keys.push(singleAfterKey);
      }
    }

    return keys;
  }
}

export const NailyComponent = new AbstractNailyComponent();
