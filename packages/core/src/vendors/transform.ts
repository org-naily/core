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
