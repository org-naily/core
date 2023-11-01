import { NailyFactory } from "@naily/core";
import { NailyExpWebPlugin, Controller, Get } from "@naily/web";
import { ExpressAdapter } from "@naily/web-express";

@Controller()
export class TestController {
  @Get()
  public index() {
    return "Hello World!";
  }
}

NailyFactory.use(
  new NailyExpWebPlugin(new ExpressAdapter()).listen(3000, (port) => {
    console.log(`Server is running on http://localhost:${port}`);
  })
);
