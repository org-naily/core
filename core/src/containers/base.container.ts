import { Scope, Type } from "../typings/common.typing";
import { NContainer } from "../typings/container.typing";

export abstract class NailyBaseFactory implements NContainer {
  protected readonly container = new Map<string, NContainer.Element>();

  public getMap<R>(): Map<string, NContainer.Element<R>> {
    return this.container;
  }

  public getAll<R>(filter: NContainer.Filter = {}): NContainer.Element<R>[] {
    let elements = Array.from(this.container.values());
    if (filter.type && filter.type.length !== 0) elements = elements.filter((element) => filter.type.includes(element.type));
    return elements;
  }

  public abstract getTransientInstance<R>(target: Type<R>): R;

  public getOneByToken<R = any>(token: string): NContainer.Element<R> | undefined {
    return this.container.get(token) as NContainer.Element;
  }

  public getOneByTokenOrThrow<R = any>(token: string): NContainer.Element<R> {
    const element = this.container.get(token);
    if (!element) throw new Error(`Element with token "${token}" not found`);
    return element as NContainer.Element;
  }

  public getClassOneByTokenOrThrow<R extends Object = Object>(token: string): NContainer.ClassElement<R> {
    const element = this.container.get(token);
    if (!element || element.type !== "class") throw new Error(`Element with token ${token} not found or not a class`);
    return element as NContainer.ClassElement;
  }

  public abstract insertClass<R extends Object>(target: Type<R>): NContainer.ClassElement<R>;

  public insertRawClass<R extends Object>(target: Type<R>, token?: string, scope?: Scope): NContainer.ClassElement<R> {
    let classElement: NContainer.ClassElement = {
      type: "class",
      scope: scope,
      instance: this.getTransientInstance(target),
      target: target,
    };
    this.container.set(token, classElement);
    return classElement;
  }

  public insertConstant<R extends any>(token: string, value: R): NContainer.ConstantElement<R> {
    this.container.set(token, {
      type: "constant",
      value: value,
    });
    return this.container.get(token) as NContainer.ConstantElement<R>;
  }

  public insertConfig<R extends any>(token: string, value: R): NContainer.ConfigElement<R> {
    this.container.set(token, {
      type: "config",
      value: value,
    });
    return this.container.get(token) as NContainer.ConfigElement<R>;
  }
}
