import { readFileSync } from "fs";
import { parse } from "yaml";
import { Configuration, NConfigure, ScopeEnum } from "..";
import * as JEXL from "jexl";
import { join } from "path";

@Configuration({ scope: ScopeEnum.PROTOTYPE })
export class NailyConfiguration implements NConfigure {
  private data = parse(readFileSync(join(process.cwd(), "naily.yaml")).toString());

  private parseRealValue(str: any) {
    if (typeof str === "string") {
      return str.replace(/\$\{(.+?)\}/g, (_match, $1) => {
        return JEXL.evalSync($1, {
          $Naily: {
            env: process.env,
          },
        });
      });
    } else {
      return str;
    }
  }

  public getConfigure(jexl: string) {
    if (!jexl) return this.data;
    const file = JEXL.evalSync(jexl, this.data);
    return this.parseRealValue(file);
  }
}
