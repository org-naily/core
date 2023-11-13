import { Controller, Get, Post } from "@naily/web";

@Controller()
export class AppController {
  @Get()
  @Post()
  public async getHello() {
    return `Hello World!`;
  }
}
