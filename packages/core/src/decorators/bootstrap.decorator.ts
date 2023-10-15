import { sync } from "glob";
import { Type } from "../typings";
import { transform } from "../vendors/transform";

interface INailyApplication {
  entry: string;
  scan: string;
}

export function NailyApplication(options: INailyApplication) {
  return (target: Type) => {
    let content = ``;
    sync(options.scan).forEach((item) => {
      content = content + `import "${item.replace(`src`, ".").replace(/.ts$/, "")}";\n`;
    });
    transform(options.entry, content);
  };
}
