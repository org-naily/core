import { readFileSync } from "fs";
import { NailyStaticConfiguration } from "..";
import Jexl from "jexl";
import { join } from "path";

export class NailyConfigurationImpl implements NailyStaticConfiguration {
  get<T>(jexl: string): T {
    const text = readFileSync(join(process.cwd(), "naily.config.json"), "utf8");
    const config = JSON.parse(text);
    return Jexl.evalSync(jexl, config);
  }
}
