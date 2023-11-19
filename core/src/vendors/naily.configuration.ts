import { Injectable } from "@/decorators";
import { NConfigure } from "@/typings";
import { readFile } from "fs/promises";
import type JEXL from "jexl";
import { parse } from "yaml";
import { join } from "path";

@Injectable()
export class NailyConfiguration implements NConfigure {
  constructor(private readonly fileName: string = "naily.yaml") {}

  async getConfigure(builder: typeof JEXL): Promise<any> {
    const fileContent = (await readFile(join(process.cwd(), this.fileName))).toString();
    return parse(fileContent);
  }
}
