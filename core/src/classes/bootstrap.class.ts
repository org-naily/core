import { NPlugin, RxType } from "../typings";
import { NailyContainer } from "./base.class";

export class NailyFactory {
  public static pluginMap: NPlugin[] = [];

  public static use(...plugins: RxType<NPlugin>[] | NPlugin[]) {
    for (const item of plugins) {
      if (typeof item === "function") {
        this.pluginMap.push(new item());
      } else {
        this.pluginMap.push(item);
      }
    }

    for (const item of this.pluginMap) {
      item.install(NailyContainer);
    }
    return this;
  }
}
