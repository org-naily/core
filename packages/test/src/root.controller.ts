import { Controller, NailyLifeCircle } from "@naily/core";

@Controller()
export class RootController implements NailyLifeCircle {
  handleInit() {
    console.log("已经初始化了 找得到直接赋值的属性了");
  }

  handleMount() {
    console.log("已经能访问属性了");
  }
}
