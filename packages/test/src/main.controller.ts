import { Before, After, Autowired } from "@naily/core";
import { Controller, Cookies, Get } from "@naily/web";
import { ListenerAspect } from "./listen.service";
import { MainService } from "./main.service";

@Controller()
export class MainController {
  @Autowired
  private readonly mainService: MainService;

  @Get()
  @Before([ListenerAspect])
  @After([ListenerAspect])
  public getHello(@Cookies cookies) {
    this.mainService.testMethod();
    return cookies;
  }
}
