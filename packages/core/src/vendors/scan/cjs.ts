import { sync } from "glob";
import { join } from "path";
import { rewriteFile } from "./rewrite";

export function scanDependency(scan: string, exclude: string[]) {
  const paths = sync(scan).filter((item) => {
    for (let i = 0; i < exclude.length; i++) {
      if (item.includes(exclude[i])) {
        return undefined;
      }
    }
    return item;
  });

  let content = ``;
  paths.forEach((item) => {
    const splitPath = item.replace(`${process.cwd()}/`, "").replace(/.ts$/, "");
    const realPath = join("..", "..", "..", splitPath);
    content = content + `import "${realPath}";`;
  });

  rewriteFile(join(process.cwd(), "node_modules/@naily/build/index.ts"), content);
}
