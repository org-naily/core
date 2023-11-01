import { NailyFactory } from "@naily/core";
import { NailyExpWebPlugin, Controller, Get, Req, Res } from "@naily/web";
import { ExpressAdapter } from "@naily/web-express";
import { Response } from "express";

@Controller()
export class TestController {
  @Get()
  public index(@Res() res: Response) {
    res.send("Hello World!!!!");
    return "Hello World!";
  }
}

new NailyFactory().use(
  new NailyExpWebPlugin(new ExpressAdapter()).listen(3000, (port) => {
    console.log(`Server is running on http://localhost:${port}`);
  })
);
