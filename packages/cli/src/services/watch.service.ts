import { Autowired, Bean, Service, Value } from "@org-naily/core";
import { BuildService } from "./build.service";
import { fork } from "child_process";
import { watch } from "fs";

@Service
export class WatchService {
  @Autowired
  private readonly buildService: BuildService;

  @Value("naily.cli.source")
  private readonly source: string;

  @Value("naily.cli.entry")
  private entry: string;

  @Bean()
  public validate() {
    if (!this.source) throw new Error(`naily.cli.source is required`);
    if ((!this.source.startsWith("./") || !this.source.startsWith("../")) && this.source.endsWith("/")) {
      throw new Error(`naily.cli.source must be a relative path`);
    }
    if (!this.entry) this.entry = "./.naily/cjs/main.js";
    if ((!this.entry.startsWith("./") || !this.entry.startsWith("../")) && this.entry.endsWith("/")) {
      throw new Error(`naily.cli.entry must be a relative path`);
    }
  }

  @Bean()
  public async watch() {
    // 验证配置文件
    this.validate();
    // 启动rollup编译器
    await this.buildService.build();
    // 启动子进程
    let child_process = fork(this.entry, {
      // 将子进程的输入输出重定向到父进程
      stdio: "inherit",
      // 环境变量
      env: {
        // 将NODE_ENV设置为development
        NODE_ENV: "development",
      },
    });
    // 监听文件变化
    watch(this.source, { recursive: true }, async (event, filename) => {
      // 当文件变化时，重新编译
      console.log(`${event.toUpperCase()} File ${filename} changed`);
      // 重新编译
      await this.buildService.build();
      // 杀掉子进程
      child_process.kill();
      // 重新启动子进程
      child_process = fork(this.entry, {
        // 将子进程的输入输出重定向到父进程
        stdio: "inherit",
        // 环境变量
        env: {
          // 将NODE_ENV设置为development
          NODE_ENV: "development",
        },
      });
    });
  }
}
