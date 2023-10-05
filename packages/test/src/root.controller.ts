import { Autowired, Controller, NailyLifeCircle, Value } from "@naily/core";
import { RootService } from "./root.service";

@Controller()
export class RootController implements NailyLifeCircle {
  constructor(private readonly rootService: RootService) {}

  @Value()
  private readonly typeorm: string;

  handleInit() {
    console.log("已经初始化了 找得到直接赋值的属性了");
  }

  handleMount() {
    console.log("已经能访问属性了");
  }
}
