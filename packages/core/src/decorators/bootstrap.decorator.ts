import { INailyApplication, Type } from "../typings";
import { Logger } from "../utils";
import { nailyScanSync } from "../vendors/scan";
import { magentaBright } from "chalk";
import * as ora from "ora";

export function NailyApplication(options: INailyApplication) {
  return (_target: Type) => {
    const spinner = ora("Naily application bootstrap starting... \n").start();
    nailyScanSync(options, (filePath) => {
      spinner.info(new Logger().ora(`${filePath} scanned`, magentaBright));
      spinner.start();
    });
    spinner.succeed(new Logger().ora(`Naily application bootstrap successfully`, magentaBright));
  };
}
