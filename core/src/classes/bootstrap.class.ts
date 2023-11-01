import { NPlugin, RxType } from "../typings";
import { NailyBaseContainer } from "./base.class";

export class NailyFactory {
  private pluginMap: NPlugin[] = [];
  public static NailyContainer = new NailyBaseContainer();

  public use(...plugins: RxType<NPlugin>[] | NPlugin[]) {
    for (const item of plugins) {
      if (typeof item === "function") {
        this.pluginMap.push(new item());
      } else {
        this.pluginMap.push(item);
      }
    }

    for (const item of this.pluginMap) {
      item.install(NailyFactory.NailyContainer);
    }
    return this;
  }
}
