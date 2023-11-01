import { readFileSync } from "fs";
import { parse } from "yaml";
import { Configuration } from "../decorators";
import { NConfiguration } from "../typings";
import { join } from "path";

@Configuration()
export class NailyConfiguration implements NConfiguration {
  public getConfigure() {
    return parse(readFileSync(join(process.cwd(), "naily.yaml")).toString());
  }
}
