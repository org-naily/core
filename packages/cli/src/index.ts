import { Command } from "commander";
import { logo } from "./logo";
import { CreateService } from "./create.service";
import { Autowired, Configuration } from "@org-naily/core";
import { BuildService } from "./build.service";

@Configuration
export class NailyCLI {
  private program = new Command();

  @Autowired
  private readonly createService!: CreateService;

  @Autowired
  private readonly buildService: BuildService;

  constructor() {
    this.program
      .name("naily")
      .version("0.26.0")
      .description("[Naily CLI] Progressive enterprise web framework for node.js")
      .addHelpText("beforeAll", logo);

    this.program.command("build").action(async () => {
      await this.buildService.build();
    });

    this.program.command("create").action(async () => {
      await this.createService.newProject();
    });

    this.program.parse(process.argv);
  }
}
