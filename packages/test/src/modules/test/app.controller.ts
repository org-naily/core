import { Autowired } from "@naily/core";
import { Controller } from "@naily/web";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  @Autowired
  private readonly appService: AppService;
}
