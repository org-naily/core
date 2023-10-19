import { join, parse } from "path";
import { INailyApplication } from "../typings";
import { getCommonPrefix, isRelativePath, transform, transformArrayToExclude } from "./transform";
import { sync } from "glob";

function transformArrayToImport(array: string[]) {
  let content = ``;
  array.forEach((item) => {
    content = content + `import "${item}";\n`;
  });
  return content;
}

export function nailyScanSync(options: INailyApplication, callBack: (filePath: string) => void) {
  if (isRelativePath(options.entry)) options.entry = join(process.cwd(), options.entry);
  if (isRelativePath(options.scan)) options.scan = join(process.cwd(), options.scan);
  const scanParsed = parse(options.scan);
  // 根据已知的exclude数组 获取被排除的文件路径数组
  const excludeFiles = transformArrayToExclude(options.exclude);

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

  // 获取到公共前缀
  const commonPrefix = getCommonPrefix(filePaths);

  filePaths.forEach((item) => {
    let importPath = item;
    // 去除公共前缀
    importPath = importPath.replace(commonPrefix, "./");
    // 去除文件扩展名
    importPath = importPath.replace(new RegExp(`${scanParsed.ext}$`), "");
    // 添加进数组
    content.push(importPath);
    callBack(importPath);
  });
  transform(options.entry, transformArrayToImport(content));
  return content;
}
