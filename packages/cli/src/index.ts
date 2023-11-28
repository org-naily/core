import { Command } from "commander";
import { logo } from "./logo";
import { CreateService } from "./services/create.service";
import { Autowired, Configuration } from "@org-naily/core";
import { BuildService } from "./services/build.service";
import { WatchService } from "./services/watch.service";

@Configuration
export class NailyCLI {
  private program = new Command();

  @Autowired
  private readonly createService: CreateService;

  @Autowired
  private readonly buildService: BuildService;

  @Autowired
  private readonly watchService: WatchService;

  constructor() {
    this.program
      .name("naily")
      .version("0.26.0")
      .description("[Naily CLI] Progressive enterprise web framework for node.js")
      .addHelpText("beforeAll", logo);

    this.program
      .command("build")
      .description("Build your project")
      .action(async () => {
        await this.buildService.build();
      });

    this.program
      .command("create")
      .description("Create a new project")
      .action(async () => {
        await this.createService.newProject();
      });

    this.program
      .command("watch")
      .description("Watch your project")
      .action(async () => {
        await this.watchService.watch();
      });

    this.program.parse(process.argv);
  }
}
