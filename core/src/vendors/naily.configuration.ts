import YAML from "yaml";
import JEXL from "jexl";
import { Injectable } from "@/decorators";
import { NConfigure } from "@/typings";
import { existsSync, readFileSync } from "fs";

@Injectable()
export class NailyConfiguration implements NConfigure {
  private file: any;

  public async getConfigure(jexl: string, builder: typeof JEXL) {
    if (existsSync("naily.yaml")) {
      this.file = YAML.parse(readFileSync("naily.yaml").toString());
    } else if (existsSync("naily.yml")) {
      this.file = YAML.parse(readFileSync("naily.yaml").toString());
    } else if (existsSync("naily.json")) {
      this.file = JSON.parse(readFileSync("naily.json").toString());
    } else {
      throw new Error(`naily local config is not found. Please check workspace root's naily.yaml, or naily.yml, or naily.json is exist.`);
    }

    return await builder.eval(jexl, this.file);
  }
}
