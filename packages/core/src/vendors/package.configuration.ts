import { readFile } from "fs/promises";
import { Bean } from "../decorators/bean.decorator";
import { NConfigure } from "../typings";

export class PackageConfiguration implements NConfigure {
  @Bean({ Initialize: true })
  public async getAllConfigure(): Promise<any> {
    const file = (await readFile("package.json")).toString();
    return JSON.parse(file);
  }
}
