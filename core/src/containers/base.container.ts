import { Type } from "../typings/common.typing";
import { NContainer } from "../typings/container.typing";

export abstract class NailyBaseFactory<T extends any = any> implements NContainer<T> {
  protected readonly container = new Map<string, NContainer.Element<T>>();

  public getMap(): Map<string, NContainer.Element<T>> {
    return this.container;
  }

  public getAll(filter: NContainer.Filter = {}): NContainer.Element<T>[] {
    let elements = Array.from(this.container.values());
    if (filter.type && filter.type.length !== 0) elements = elements.filter((element) => filter.type.includes(element.type));
    return elements;
  }

  public getOneByToken(token: string): NContainer.Element<T> | undefined {
    return this.container.get(token);
  }

  public getOneByTokenOrThrow(token: string): NContainer.Element<T> {
    const element = this.container.get(token);
    if (!element) throw new Error(`Element with token "${token}" not found`);
    return element;
  }

  public getClassOneByTokenOrThrow(token: string): NContainer.ClassElement<T> {
    const element = this.container.get(token);
    if (!element || element.type !== "class") throw new Error(`Element with token ${token} not found or not a class`);
    return element;
  }

  public abstract insertClass(target: Type<T>): NContainer.ClassElement<T>;

  public insertConstant(token: string, value: T): NContainer.ConstantElement<T> {
    this.container.set(token, {
      type: "constant",
      value: value,
    });
    return this.container.get(token) as NContainer.ConstantElement<T>;
  }

  public insertConfig(token: string, value: T): NContainer.ConfigElement<T> {
    this.container.set(token, {
      type: "config",
      value: value,
    });
    return this.container.get(token) as NContainer.ConfigElement<T>;
  }
}
