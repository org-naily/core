import { NToken } from "../typings";
import { NContainer } from "../typings/container.typing";

export class NailyContainer {
  protected readonly container = new Map<NToken, NContainer.Element>();

  public getMap() {
    return this.container;
  }

  public getElementByToken(token: NToken) {
    return this.container.get(token);
  }

  public getElementByTokenOrThrow(token: NToken) {
    const element = this.getElementByToken(token);
    if (!element) throw new Error(`Element with token ${String(token)} not found`);
  }

  public getClassElementByToken<Instance>(token: NToken) {
    return this.getElementByToken(token) as NContainer.ClassElement<Instance>;
  }

  public getClassElementByTokenOrThrow<Instance>(token: NToken) {
    const element = this.getClassElementByTokenOrThrow(token) as NContainer.ClassElement<Instance>;
    if (element.type !== "class") throw new TypeError(`Element with token ${String(token)} is not a class element`);
    return element;
  }

  public setClassElement<Instance>(token: NToken, element: NContainer.ClassElement<Instance>) {
    this.container.set(token, element);
  }

  public setClassElementOrThrow<Instance>(token: NToken, element: NContainer.ClassElement<Instance>) {
    if (this.container.has(token)) throw new Error(`Element with token ${String(token)} already exists`);
    this.setClassElement(token, element);
  }

  public hasElement(token: NToken) {
    return this.container.has(token);
  }

  public hasClassElement(token: NToken) {
    return this.hasElement(token) && this.getElementByToken(token).type === "class";
  }

  public clear() {
    this.container.clear();
  }
}
