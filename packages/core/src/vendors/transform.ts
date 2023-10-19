import { sync } from "glob";
import { join } from "path";
import { Project } from "ts-morph";

const project = new Project({
  tsConfigFilePath: "./tsconfig.json",
});

export function transform(entry: string, text: string) {
  const sourceFile = project.getSourceFile(entry);
  sourceFile.insertText(0, text);
  project.emit();
}

export function isRelativePath(path: string) {
  return !path.startsWith("/");
}

export function transformArrayToExclude(array: string[]) {
  let files: string[] = [];
  array.forEach((item) => {
    sync(item).forEach((file) => {
      if (isRelativePath(file)) file = join(process.cwd(), file);
      files.push(file);
    });
  });
  return files;
}

export function getCommonPrefix(array: string[]) {
  // 如果数组为空，返回空字符串
  if (array.length === 0) {
    return "";
  }
  // 如果数组只有一个元素，返回该元素
  if (array.length === 1) {
    return array[0];
  }
  // 对数组进行排序，按照字典顺序
  array.sort();
  // 取数组的第一个和最后一个元素，它们的公共前缀就是整个数组的公共前缀
  let first = array[0];
  let last = array[array.length - 1];
  // 初始化公共前缀为空字符串
  let commonPrefix = "";
  // 遍历第一个和最后一个元素的每个字符，比较是否相等
  for (let i = 0; i < Math.min(first.length, last.length); i++) {
    // 如果相等，将该字符加入公共前缀
    if (first[i] === last[i]) {
      commonPrefix += first[i];
    } else {
      // 如果不相等，说明公共前缀已经结束，跳出循环
      break;
    }
  }
  // 返回公共前缀
  return commonPrefix;
}
