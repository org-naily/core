import { readFileSync } from "fs";
import { NConfigure } from "../typings";
import { join } from "path";
import YAML from "yaml";
import { Injectable } from "../decorators";

@Injectable()
export class NailyConfigure implements NConfigure {
  public readonly isPromise = false;

  public getConfigure() {
    return YAML.parse(readFileSync(join(process.cwd(), "naily.yaml")).toString());
  }
}
