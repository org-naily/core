import { sync } from "glob";
import { INailyApplication, Type } from "../typings";
import { transform } from "../vendors/transform";
import { Logger } from "../utils";
import { join } from "path";

export function NailyApplication(options: INailyApplication) {
  return (target: Type) => {
    let content = ``;

    sync(options.scan).forEach((item) => {
      const relativePath = item
        // 去除扩展名
        .replace(/.ts$/, "")
        // 去除根目录
        .replace(`${process.cwd()}/`, "")
        // 去除rootDir
        .replace(join(options.rootDir), ".");

      if (join(process.cwd(), options.iocDir) === join(process.cwd(), item)) return;

      content = content + `import "${relativePath}";\n`;
      new Logger().info(`${relativePath} scanned`);
    });
    transform(options.entry, content);
    new Logger().info(`Naily application bootstrap successfully`);
  };
}
