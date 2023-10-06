import { sync } from "glob";
import { join } from "path";
import { rewriteFile } from "./rewrite";

class NailyDependencyClass {
  private path = join(process.cwd(), "node_modules/@naily/build/index.ts");
  private content = ``;

  addDependencyByGlob(scan: string, exclude: string[]): this {
    const paths = sync(scan).filter((item) => {
      for (let i = 0; i < exclude.length; i++) {
        if (item.includes(exclude[i])) {
          return undefined;
        }
      }
      return item;
    });

    paths.forEach((item) => {
      this.addDependencyByAbsolutePath(item);
    });

    return this;
  }

  addDependencyByAbsolutePath(path: string): this {
    const splitPath = path.replace(`${process.cwd()}/`, "").replace(/.ts$/, "");
    const realPath = join("..", "..", "..", splitPath);
    this.content = this.content + `import "${realPath}";`;
    return this;
  }

  addDependencyByRelativePath(path: string): this {
    this.content = this.content + `import "${path}";`;
    return this;
  }

  save(message?: string): void {
    rewriteFile(this.path, this.content, message);
  }
}

export const NailyDependency = new NailyDependencyClass();
