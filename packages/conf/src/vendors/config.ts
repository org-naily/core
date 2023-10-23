import { NailyStaticConfiguration } from "..";
import Jexl from "jexl";

export class NailyConfigurationImpl implements NailyStaticConfiguration {
  get<T>(jexl: string): T {
    return Jexl.evalSync(jexl);
  }
}
