import { Type } from "../typings";
import { NailyContainer } from "./container.class";
import { NailyInjectableFactory } from "./injectable.class";

export class NailyFactory {
  public static readonly container = new NailyContainer();

  public static pipe<Instance>(target: Type<Instance>) {
    return new NailyInjectableFactory(target);
  }
}
