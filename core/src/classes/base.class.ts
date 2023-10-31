import { NailyIocWatermark } from "../constants/watermark.constant";
import { NContainer, Type } from "../typings";

export class NailyBaseContainer implements NContainer {
  protected readonly container = new Map<string | symbol, NContainer.Element>();

  add<Instance extends Object, Value>(target: Type<Instance>, token?: string | symbol): NContainer.Element<Instance, Value> {
    Reflect.defineMetadata(NailyIocWatermark.INJECTABLE, token, target);
    const classElement: NContainer.Element<Instance, Value> = {
      type: "class",
      target: target,
      instance: new target(),
    };
    this.container.set(token, classElement);
  }

  get<Instance extends Object, Value = any>(token: string | symbol): NContainer.Element<Instance, Value> {
    throw new Error("Method not implemented.");
  }

  getElementByTargetOrThrow<Instance>(target: Type<Instance>): NContainer.Element {
    const token: string | symbol | undefined = Reflect.getMetadata(NailyIocWatermark.INJECTABLE, target);
    if (!token) throw new Error(`Cannot find token for ${target.name}`);
    return this.container.get(token);
  }

  has(token: string | symbol): boolean {
    throw new Error("Method not implemented.");
  }

  remove(token: string | symbol): void {
    throw new Error("Method not implemented.");
  }

  clear(): void {
    throw new Error("Method not implemented.");
  }
}
