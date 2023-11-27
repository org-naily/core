import { rollup } from "rollup";
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import { Bean, Value } from "@org-naily/core";
import { readFileSync } from "fs";
import { extname, join, relative } from "path";
import { NailyRollupPlugin } from "@org-naily/unplugin";
import { sync } from "glob";

export class BuildService {
  @Value("naily.cli.source")
  private readonly source: string;

  @Value("naily.cli.output")
  private readonly output: string;

  constructor() {
    if (!this.source) throw new Error(`naily.cli.source is required`);
    if ((!this.source.startsWith("./") || !this.source.startsWith("../")) && this.source.endsWith("/")) {
      throw new Error(`naily.cli.source must be a relative path`);
    }
  }

  @Bean()
  private getExternal() {
    const packageJSONFile = readFileSync(join(process.cwd(), "package.json")).toString() as any;
    const packageJSON = JSON.parse(packageJSONFile);
    const deps = Object.keys(packageJSON.dependencies || {});
    const devDeps = Object.keys(packageJSON.devDependencies || {});
    const peerDeps = Object.keys(packageJSON.peerDependencies || {});
    return [...deps, ...devDeps, ...peerDeps].filter((dep) => (dep === "tslib" ? undefined : dep));
  }

  @Bean()
  public async build() {
    const builder = await rollup({
      plugins: [nodeResolve(), typescript(), NailyRollupPlugin()],
      external: [...this.getExternal()],
      input: Object.fromEntries(
        sync(join(this.source, "**/*.ts"), { absolute: true }).map((file) => [
          // 这里将删除 `src/` 以及每个文件的扩展名。
          // 因此，例如 src/nested/foo.js 会变成 nested/foo
          relative(this.source, file.slice(0, file.length - extname(file).length)),
          // 这里可以将相对路径扩展为绝对路径，例如
          // src/nested/foo 会变成 /project/src/nested/foo.js
          file,
        ])
      ),
      onLog(level, log, d) {
        if (!log.message.includes("Sourcemap is likely to be incorrect")) {
          d(level, log);
        }
      },
    });
    console.log("Building CommonJS...");
    await builder.write({
      format: "commonjs",
      sourcemap: "inline",
      dir: join(this.output ? this.output : ".naily", "cjs"),
    });
    console.log("Building ESM...");
    await builder.write({
      format: "module",
      sourcemap: "inline",
      dir: join(this.output ? this.output : ".naily", "esm"),
    });
    console.log("Done");
  }
}
