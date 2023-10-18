import { existsSync, readFileSync } from "fs";
import * as JEXL from "jexl";
import { Logger } from "../utils";

class NailyAbstractConfigure {
  private readonly configure: object | Array<any>;

  constructor() {
    this.configure = this.getNailyConfig();
  }

  public getAll() {
    return this.configure;
  }

  public getNailyConfig() {
    if (existsSync("./naily.config.json")) {
      const file = readFileSync("./naily.config.json", "utf8").toString();
      return JSON.parse(file) as object | any[];
    }
    throw new Error("naily.config.json not found");
  }

  public getConfigureByJexl<T extends any = any>(jexl: string): T {
    try {
      return JEXL.evalSync(jexl, this.configure);
    } catch (error) {
      new Logger().error(error.message ? error.message : error);
      throw error;
    }
  }

  public getConfigureByJexlDynamic<T extends any = any>(jexl: string): T {
    try {
      const configure = this.getNailyConfig();
      return JEXL.evalSync(jexl, configure);
    } catch (error) {
      new Logger().error(error.message ? error.message : error);
      throw error;
    }
  }
}

export const NailyConfigure = new NailyAbstractConfigure();
