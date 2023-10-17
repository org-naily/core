import { sync } from "glob";
import { Type } from "../typings";
import { transform } from "../vendors/transform";
import { Logger } from "../utils";
import { dirname } from "path";

interface INailyApplication {
  entry: string;
  scan: string;
  filename: string;
}

function getMainDir(path: string) {
  return dirname(path).replace(`${process.cwd()}/`, "");
}

export function NailyApplication(options: INailyApplication) {
  return (target: Type) => {
    let content = ``;

    sync(options.scan).forEach((item) => {
      const relativePath = item.replace(getMainDir(item), ".").replace(/.ts$/, "").replace(`${process.cwd()}/`, "");
      if (item.replace(/.ts$/, "") === options.filename.replace(/.js$/, "")) return;
      content = content + `import "${relativePath}";\n`;
      new Logger().info(`${relativePath} scanned`);
    });
    transform(options.entry, content);
  };
}
