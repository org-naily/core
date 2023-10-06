import { INailyApplication, Type } from "../../typings";
import { NailyDependency } from "../../vendors";

export function NailyApplication(configure: INailyApplication) {
  return (target: Type) => {
    NailyDependency.addDependencyByGlob(configure.scan, configure.exclude).save("核心包扫描完成");
  };
}
