import { Injectable, NToken, Type, NContainer } from "..";

@Injectable()
export class NailyInjectableManager {
  // Bean单例池
  protected static readonly map = new Map<NToken, NContainer.Element>();

  public static addClassElementOrChange(token: NToken, target: Type, instance: Object) {
    this.map.set(token, {
      type: "class",
      target: target,
      instance: instance,
    });
  }

  public static getMap() {
    return this.map;
  }

  public static getElement(token: NToken) {
    return this.map.get(token);
  }

  public static getClassElement(token: NToken): NContainer.ClassElement | undefined {
    const element = this.getElement(token);
    if (!element) return undefined;
    if (element.type !== "class") return undefined;
    return element;
  }

  public static getClassElementOrThrow(token: NToken, msg?: string): NContainer.ClassElement {
    const element = this.getElement(token);
    if (!element) throw new TypeError(msg ? msg : `${String(token)} is not a class element.`);
    if (element.type !== "class") throw new TypeError(msg ? msg : `${String(token)} is not a class element.`);
    return element;
  }
}
