import { readFile } from "fs/promises";
import { NConfigure } from "../typings";
import { parse } from "yaml";
import { Bean } from "../decorators/bean.decorator";

export class NailyConfiguration implements NConfigure {
  @Bean({ Initialize: true })
  async getAllConfigure(): Promise<any> {
    const file = (await readFile("naily.yaml")).toString();
    return parse(file);
  }
}
