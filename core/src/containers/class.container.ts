import { NailyInjectableFactory } from "../classes/injectable.class";
import { NToken, Type } from "../typings";
import { NContainer } from "../typings/container.typing";
import { NailyBaseContainer } from "./base.container";

export class NailyClassContainer extends NailyBaseContainer implements NContainer {
  public getClassElementByToken<Instance>(token: NToken) {
    return this.getElementByToken(token) as NContainer.ClassElement<Instance>;
  }

  public getClassElementByTokenOrThrow<Instance>(token: NToken) {
    const element = this.getClassElementByToken(token) as NContainer.ClassElement<Instance>;
    if (!element || element.type !== "class") throw new TypeError(`Element with token ${String(token)} is not a class element`);
    return element;
  }

  public getClassElementByTarget<Instance>(target: Type) {
    const pipe = new NailyInjectableFactory(target);
    pipe.getMetadata();
  }

  public setClassElement<Instance>(token: NToken, element: NContainer.ClassElement<Instance>) {
    this.container.set(token, element);
  }

  public setClassElementOrThrow<Instance>(token: NToken, element: NContainer.ClassElement<Instance>) {
    if (this.container.has(token)) throw new Error(`Element with token ${String(token)} already exists`);
    this.setClassElement(token, element);
  }

  public hasClassElement(token: NToken) {
    return this.hasElement(token) && this.getElementByToken(token).type === "class";
  }
}
