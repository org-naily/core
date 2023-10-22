import { join } from "path";
import { Project } from "ts-morph";

const project = new Project({
  tsConfigFilePath: join(process.cwd(), "tsconfig.json"),
});

export function transform(entry: string, text: string) {
  const sourceFile = project.getSourceFile(entry);
  sourceFile.insertText(0, text);
  project.emit();
}
