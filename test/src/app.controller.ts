import { Controller, Get, Post, UseAdvice } from "@naily/web";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  @Get()
  @Post()
  @UseAdvice(AppService)
  public async getHello() {
    return `Hello World!`;
  }
}
