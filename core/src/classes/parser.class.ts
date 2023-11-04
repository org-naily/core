import { Type } from "../typings";
import { NailyInjectableFactory } from "./injectable.class";

export class NailyInjectableParser<Instance> {
  constructor(private readonly target: Type<Instance>) {}

  public transformConstructorParamtypesToInstance(): Object[] {
    const paramtypes = new NailyInjectableFactory<Instance>(this.target).getParamtypesOrThrow();
    return paramtypes.map((paramtype) => new NailyInjectableFactory(paramtype).createInstance());
  }
}
