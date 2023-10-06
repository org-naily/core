import { NailyLifeCircle } from "@naily/core";
import { Controller, Get } from "@naily/web";
import { RootService } from "./root.service";

@Controller()
export class RootController implements NailyLifeCircle {
  constructor(private readonly rootService: RootService) {}

  handleInit() {
    console.log("已经初始化了 找得到直接赋值的属性了");
  }

  @Get()
  handleMount() {
    console.log("已经能访问属性了");
  }
}
