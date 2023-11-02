import { NailyIocWatermark, Scope } from "../constants/watermark.constant";
import { NConfiguration, NContainer, NLifeCycle, NToken, Type } from "../typings";
import { generateToken } from "../utils/generate";
import { NailyClassFactory } from "./class.factory";

export class NailyBaseContainer implements NContainer {
  protected readonly container = new Map<string | symbol, NContainer.Element>();

  public addClass<Instance extends NLifeCycle>(
    target: Type<Instance>,
    token: string | symbol = generateToken(),
    scope: Scope = Scope.SINGLETON
  ): NContainer.ClassElement<Instance> {
    Reflect.defineMetadata(NailyIocWatermark.INJECTABLE, token, target);
    Reflect.defineMetadata(NailyIocWatermark.SCOPE, scope, target);

    const classElement: NContainer.ClassElement<Instance> = {
      type: "class",
      target: target,
      instance: new NailyClassFactory(this).getClassInstance(target),
    };
    this.container.set(token, classElement);
    return classElement;
  }

  public async addConfiguration<Instance extends NConfiguration<Value>, Value>(
    target: Type<Instance>,
    token: string = generateToken()
  ): Promise<NContainer.ConfigureElement<Instance, Value>> {
    const instance = new target();
    const configureElement: NContainer.ConfigureElement<Instance, Value> = {
      type: "configure",
      target: target,
      instance: instance,
      value: await instance.getConfigure(),
    };
    this.container.set(token, configureElement);
    return configureElement;
  }

  public getAll() {
    return Array.from(this.container.values());
  }

  public getMap() {
    return this.container;
  }

  public getClassOrThrow<Instance extends NLifeCycle>(token: string | symbol): NContainer.ClassElement<Instance> {
    return this.container.get(token) as NContainer.ClassElement<Instance>;
  }

  public getElementByTargetOrThrow<Instance>(target: Type<Instance>): NContainer.Element {
    const token: string | symbol | undefined = Reflect.getMetadata(NailyIocWatermark.INJECTABLE, target);
    if (!token) throw new Error(`Cannot find token for ${target.name}`);
    return this.container.get(token);
  }

  public has(token: string | symbol): boolean {
    return this.container.has(token);
  }

  public changeClassInstance<Instance extends NLifeCycle>(token: NToken, instance: Instance): void {
    const element = this.container.get(token);
    if (!element) throw new Error(`Cannot find element for ${token.toString()}`);
    if (element.type !== "class") throw new TypeError(`Cannot change instance for ${token.toString()}`);
    element.instance = instance;
    this.container.set(token, element);
  }

  public remove(token: string | symbol): void {
    this.container.delete(token);
  }

  public clear(): void {
    this.container.clear();
  }
}
