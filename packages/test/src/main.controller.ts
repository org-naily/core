import { Bean } from "@naily/core";
import { Controller, Get } from "@naily/web";
import { ListenService } from "./listen.service";

@Controller()
export class MainController {
  @Get()
  @Bean([ListenService], [ListenService])
  public getHello() {
    return "hello world";
  }
}
