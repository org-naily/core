import { Controller, Get } from "@naily/web";

@Controller()
export class MainController {
  @Get()
  getHello() {
    return "hello world";
  }
}
