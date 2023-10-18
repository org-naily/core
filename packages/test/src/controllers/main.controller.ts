import { Before, After, Autowired, Value } from "@naily/core";
import { Controller, Get } from "@naily/web";
import { ListenerAspect } from "../listen.service";
import { MainService } from "../main.service";

@Controller()
export class MainController {
  @Autowired
  private readonly mainService: MainService;
  @Value("naily", true)
  private readonly aaa: string;

  @Get()
  @Before([ListenerAspect])
  @After([ListenerAspect])
  public getHello() {
    console.log(this.aaa);
  }
}
