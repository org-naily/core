import { INailyContainerImpl, INailyContainerItem, Type } from "..";

export abstract class NailyContainer<T extends object = object> implements INailyContainerImpl {
  protected readonly container = new Map<string | symbol, INailyContainerItem<T>>();

  public getAll() {
    return this.container;
  }

  public getOwnKeys<T>(target: Type<T>): (string | symbol)[] {
    return Reflect.ownKeys(target.prototype).filter((key) => (key === "constructor" ? undefined : key)) || [];
  }

  public get(key: string): INailyContainerItem {
    return this.container.get(key);
  }

  public delete(key: string) {
    return this.container.delete(key);
  }
}
