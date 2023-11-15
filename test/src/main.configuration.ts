import { Autowired, Configuration } from "@naily/core";
import { MainService } from "./main.service";

@Configuration
export class MainConfiguration {
  @Autowired
  private readonly mainService: MainService;

  constructor() {}
}
