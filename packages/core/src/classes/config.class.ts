import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { parse } from "yaml";
import * as jexl from "jexl";

export class ConfigurationTool {
  public getEnvironment() {
    return process.env.NODE_ENV;
  }

  public getNailyConfiguration(): object {
    const env = this.getEnvironment();

    // 优先级：naily.${env}.yaml > naily.yaml
    if (env && existsSync(join(process.cwd(), `naily.${env}.yaml`))) {
      const res = readFileSync(join(process.cwd(), `naily.${env}.yaml`)).toString();
      return parse(res);
    } else if (existsSync(join(process.cwd(), "naily.yaml"))) {
      const res = readFileSync(join(process.cwd(), "naily.yaml")).toString();
      return parse(res);
    } else {
      throw new Error(`naily.yaml is not found in ${process.cwd()}. Please created it.`);
    }
  }

  public getNailyConfigurationByJexl(expression: string) {
    const res = this.getNailyConfiguration();
    return jexl.evalSync(expression, res);
  }
}
