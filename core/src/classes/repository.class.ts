import { Injectable } from "@/decorators";
import { NToken } from "@/typings";

@Injectable()
export class NailyRepository {
  public static readonly map = new Map<NToken, NIOC.Element>();

  public static set(token: NToken, element: NIOC.Element) {
    this.map.set(token, element);
    return this;
  }

  public static get<T extends NIOC.Element = NIOC.Element>(token: NToken): T {
    return this.map.get(token) as T;
  }

  public static has(token: NToken): boolean {
    return this.map.has(token);
  }

  public static getClassElement<T = any>(token: NToken): NIOC.ClassElement<T> {
    const element = this.get<NIOC.ClassElement>(token);
    if (!element || element.type !== "class") throw new Error(`The element of ${token.toString()} is not a class element.`);
    return element;
  }

  public static getConstantElement<T = any>(token: NToken): NIOC.ConstantElement<T> {
    const element = this.get<NIOC.ConstantElement>(token);
    if (!element || element.type !== "constant") throw new Error(`The element of ${token.toString()} is not a constant element.`);
    return element;
  }
}
