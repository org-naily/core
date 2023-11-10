import { readFileSync } from "fs";
import { parse } from "yaml";
import { Injectable, NConfigure } from "..";
import * as JEXL from "jexl";
import { join } from "path";

@Injectable()
export class NailyConfiguration implements NConfigure {
  getConfigure(jexl: string) {
    return JEXL.evalSync(jexl, parse(readFileSync(join(process.cwd(), "naily.yaml")).toString()));
  }
}
