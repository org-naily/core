import { INailyContainerImpl, INailyContainerItem, RxType } from "@naily/core";
import { INailyInjectableScanner } from "..";
import { NailyUtil } from "@naily/core";

class NailyAbstractScanContainer implements INailyContainerImpl {
  private readonly container = new Map<string, INailyContainerItem<INailyInjectableScanner>>();

  public add(target: RxType<INailyInjectableScanner>) {
    this.container.set(NailyUtil.generate_key(), {
      target,
      instance: new target(),
    });
  }

  public getAll() {
    return this.container;
  }
}

export const NailyScanContainer = new NailyAbstractScanContainer();
