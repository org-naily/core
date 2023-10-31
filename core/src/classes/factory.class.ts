import { NContainer, NFactory, Type } from "../typings";

export class NailyFactory implements NFactory {
  protected transformParamTypes(param: Type[], container: NContainer): Object[] {
    return param.map((typing) => {
      const element = container.getElementByTargetOrThrow(typing);
      if (element.type === "class") throw new TypeError(`Cannot inject class ${typing.name}`);
      return element.instance;
    });
  }

  public getInstance<Instance extends Object>(target: Type<Instance>): Instance {
    const instance = new target();
    return instance;
  }
}
