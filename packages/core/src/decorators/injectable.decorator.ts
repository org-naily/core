import { WATERMARK } from "../constants/watermark.constant";
import { Type } from "../typings/common.typing";
import { Logger } from "../utils";
import { GenerateKey } from "../utils/generate_key";
import { NailyDependency } from "../vendors/dependency.class";
import { green } from "chalk";
import * as ora from "ora";

export function Injectable(key: string = GenerateKey()) {
  return (target: Type) => {
    const spinner = ora(`${target.name} is initializing...`);
    spinner.start();
    Reflect.defineMetadata(WATERMARK.INJECTABLE, key, target);
    NailyDependency.add(target);
    spinner.succeed(new Logger().ora(`${target.name} is initialized`, green));
  };
}
