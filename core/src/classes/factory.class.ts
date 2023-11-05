import { Type } from "../typings";
import { NailyClassContainer } from "../containers";
import { NailyInjectableFactory } from "./injectable.class";

export class NailyFactory {
  public static readonly container = new NailyClassContainer();

  public static pipe<Instance>(target: Type<Instance>) {
    return new NailyInjectableFactory(target);
  }
}
