import { Autowired } from "@naily/core";
import { Controller, Get } from "@naily/web";
import { AppService } from "../providers/app.service";

@Controller()
export class AppController {
  @Autowired
  private readonly appService: AppService;

  @Get()
  public index() {
    return this.appService.getName();
  }
}
