import { Autowired, NailyFactory, Value } from "@naily/core";
import { Scope } from "@naily/core/dist/constants/watermark.constant";
import { NailyExpWebPlugin, Controller, Get, NPipe, Pipe, Query } from "@naily/web";
import { ExpressAdapter } from "@naily/web-express";
import { json, urlencoded } from "express";

@Pipe(undefined, Scope.TRANSIENT)
export class TestPipe implements NPipe {
  transform(value: any, host: NPipe.PipeArgumentMeta) {
    console.log("调用了一次pipe:");
    console.log(host);
    return value;
  }

  val() {
    return "hello world";
  }
}

@Controller()
export class TestController {
  @Autowired
  private readonly testPipe: TestPipe;

  @Value("naily.port")
  private readonly port: number;

  @Get()
  public index(@Query() query: any) {
    return this.testPipe.val();
  }
}

new NailyFactory().use(
  new NailyExpWebPlugin(new ExpressAdapter())
    .use(json())
    .use(urlencoded({ extended: true }))
    .listen(3000, (port) => {
      console.log(`Server is running on http://localhost:${port}`);
    })
);
