import { InjectableFactory } from "../classes";
import { NLifeCycle, NToken, Type } from "../typings";
import { NFactory } from "../typings/factory.typing";

export class NailyBaseContainer implements NFactory {
  protected readonly container = new Map<NToken, NFactory.Element>();

  public getMap(): Map<NToken, NFactory.Element<NLifeCycle>> {
    return this.container;
  }

  public addClass<T extends NLifeCycle>(token: NToken, target: Type<T>, instance: T): NFactory.ClassElement<T> {
    const element: NFactory.ClassElement = {
      type: "class",
      target: target,
      instance: instance,
    };
    this.container.set(token, element);
    return element as NFactory.ClassElement<T>;
  }

  public getClassByToken<T = NLifeCycle>(token: NToken): NFactory.ClassElement<T> {
    return this.container.get(token) as NFactory.ClassElement<T>;
  }

  public getClassByTarget<T = NLifeCycle>(target: Type<NLifeCycle>): NFactory.ClassElement<T> {
    const token = new InjectableFactory(target).getTokenOrThrow();
    return this.getClassByToken(token);
  }
}
