import { readFileSync } from "fs";
import { parse } from "yaml";
import { Configuration, NConfigure, ScopeEnum } from "..";
import * as JEXL from "jexl";
import { join } from "path";

@Configuration({ scope: ScopeEnum.PROTOTYPE })
export class NailyConfiguration implements NConfigure {
  public getConfigure(jexl: string) {
    return JEXL.evalSync(jexl, parse(readFileSync(join(process.cwd(), "naily.yaml")).toString()));
  }
}
