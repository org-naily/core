import { sync } from "glob";
import { INailyApplicationOptions } from "@naily/core";
import { join, parse } from "path";
import { transform } from "./scan.js";
import { NailyScanContainer } from "../containers/scan.container.js";

export class NailyScanFactory {
  private static transformStringArrayToImportString(arr: string[]) {
    let content = "";
    arr.forEach((item) => {
      content += `import '${item}';\n`;
    });
    return content;
  }

  private static parsePathEnd(path: string) {
    return path.substring(path.length - 1, path.length) === "/" ? path.replace(/\/$/, "") : path;
  }

  private static isRelativePath(path: string) {
    return !path.startsWith("/");
  }

  private static transformArrayToExclude(array: string[]) {
    let files: string[] = [];
    array.forEach((item) => {
      sync(item).forEach((file) => {
        if (this.isRelativePath(file)) file = join(process.cwd(), file);
        files.push(file);
      });
    });
    return files;
  }

  public static scanFileSync(options: INailyApplicationOptions) {
    if (this.isRelativePath(options.entry)) options.entry = join(options.entry);
    if (this.isRelativePath(options.scan)) options.scan = join(options.scan);
    const excludeFiles = this.transformArrayToExclude(options.exclude);
    const commonPrefix = this.parsePathEnd(
      this.isRelativePath(options.rootDir) ? join(options.rootDir) : options.rootDir.replace(`${process.cwd()}/`, ""),
    );

    // 用于存放扫描到的文件路径
    const content: string[] = [];
    // 获取到所有文件路径
    const filePaths = sync(options.scan, {
      // 不返回绝对路径
      absolute: false,
    }).filter((relativePath) => {
      // 转换为绝对路径
      const absolutePath = join(process.cwd(), relativePath);
      // 如果是被排除的文件路径 则返回undefined
      if (excludeFiles.includes(absolutePath)) return undefined;
      return relativePath;
    });

    const scanParsed = parse(options.scan);
    filePaths.forEach((item) => {
      let importPath = item;
      // 去除公共前缀
      importPath = importPath.replace(commonPrefix, ".");
      // 去除文件扩展名
      importPath = importPath.replace(new RegExp(`${scanParsed.ext}$`), "");
      // 所有路径操作装载完毕，API开始工作
      let realImportPath = "";
      NailyScanContainer.getAll().forEach((pathItem) => {
        realImportPath = pathItem.instance.scan(importPath, options);
      });
      content.push(realImportPath ? realImportPath : importPath);
    });

    transform(options.entry, this.transformStringArrayToImportString(content));
    return content;
  }
}
