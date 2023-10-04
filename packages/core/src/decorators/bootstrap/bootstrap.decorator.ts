import { INailyApplication, Type } from "../../typings";
import { scanDependency } from "../../vendors";

export function NailyApplication(configure: INailyApplication) {
  return (target: Type) => {
    scanDependency(configure.scan, configure.exclude);
  };
}
