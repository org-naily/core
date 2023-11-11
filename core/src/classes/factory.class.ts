import { NToken, Type, NContainer, NIoc } from "@/typings";
import { Injectable } from "@/decorators";

@Injectable()
export class NailyInjectableManager {
  // Bean单例池
  protected static readonly map = new Map<NToken, NContainer.Element>();

  public static addClassElementOrChange(token: NToken, target: Type, instance: Object, options: NIoc.InjectableOptions, isConfiguration: boolean) {
    this.map.set(token, {
      type: "class",
      target: target,
      instance: instance,
      options: options,
      isConfiguration: isConfiguration,
    });
  }

  public static getMap() {
    return this.map;
  }

  public static getElement(token: NToken) {
    return this.map.get(token);
  }

  public static getClassElement<Instance>(token: NToken): NContainer.ClassElement<Instance> | undefined {
    const element = this.getElement(token);
    if (!element) return undefined;
    if (element.type !== "class") return undefined;
    return element as NContainer.ClassElement<Instance>;
  }

  public static getClassElementOrThrow<Instance>(token: NToken, msg?: string): NContainer.ClassElement<Instance> {
    const element = this.getElement(token);
    if (!element) throw new TypeError(msg ? msg : `${String(token)} is not a class element.`);
    if (element.type !== "class") throw new TypeError(msg ? msg : `${String(token)} is not a class element.`);
    return element as NContainer.ClassElement<Instance>;
  }
}
