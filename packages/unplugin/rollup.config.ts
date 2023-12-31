import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import { fileURLToPath } from "url";
import { extname, join, relative } from "path";
import { sync } from "glob";
import { readFileSync } from "fs";

function getExternal() {
  const packageJSONFile = readFileSync(join(process.cwd(), "package.json")).toString() as any;
  const packageJSON = JSON.parse(packageJSONFile);
  const deps = Object.keys(packageJSON.dependencies || {});
  const devDeps = Object.keys(packageJSON.devDependencies || {});
  const peerDeps = Object.keys(packageJSON.peerDependencies || {});
  return [...deps, ...devDeps, ...peerDeps].filter((dep) => (dep === "tslib" ? undefined : dep));
}

export default defineConfig({
  plugins: [nodeResolve(), typescript()],
  external: [...getExternal()],
  input: Object.fromEntries(
    sync("src/**/*.ts").map((file) => [
      // 这里将删除 `src/` 以及每个文件的扩展名。
      // 因此，例如 src/nested/foo.js 会变成 nested/foo
      relative("src", file.slice(0, file.length - extname(file).length)),
      // 这里可以将相对路径扩展为绝对路径，例如
      // src/nested/foo 会变成 /project/src/nested/foo.js
      // @ts-ignore
      fileURLToPath(new URL(file, import.meta.url)),
    ])
  ),
  output: [
    {
      format: "commonjs",
      sourcemap: "inline",
      dir: "lib/cjs",
    },
    {
      format: "module",
      sourcemap: "inline",
      dir: "lib/esm",
    },
  ],
});
