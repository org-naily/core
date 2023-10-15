import { Project } from "ts-morph";
import { sync } from "glob";

const project = new Project({
  tsConfigFilePath: "./tsconfig.json",
});

export function transform(entry: string, text: string) {
  const sourceFile = project.getSourceFile(entry);
  const imports = sourceFile.getImportDeclarations();

  sourceFile.insertText(0, text);

  project.emit();
}
