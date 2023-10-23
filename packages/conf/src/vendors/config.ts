import { existsSync, readFileSync } from "fs";
import { NailyStaticConfiguration } from "..";
import { join } from "path";
import { evalSync } from "jexl";
import YAML from "yaml";

export class NailyConfigure implements NailyStaticConfiguration {
  getConfig() {
    const jsonIsExist = existsSync(join(process.cwd(), "naily.config.json"));
    const yamlIsExist = existsSync(join(process.cwd(), "naily.config.yaml"));
    const ymlIsExist = existsSync(join(process.cwd(), "naily.config.yml"));
    if (jsonIsExist) {
      const text = readFileSync(join(process.cwd(), "naily.config.json"), "utf8").toString();
      return JSON.parse(text);
    } else if (yamlIsExist) {
      const text = readFileSync(join(process.cwd(), "naily.config.yaml"), "utf8").toString();
      return YAML.parse(text);
    } else if (ymlIsExist) {
      const text = readFileSync(join(process.cwd(), "naily.config.yml"), "utf8").toString();
      return YAML.parse(text);
    } else {
      throw new Error(`naily.config.json or naily.config.yaml or naily.config.yml not found. Please create it in ${process.cwd()}`);
    }
  }

  get(jexl: string) {
    const config = this.getConfig();
    return evalSync(jexl, config);
  }
}
