import { Autowired, Injectable } from "@naily/core";
import { Controller, INailyWebImpl, NailyWebArgumentHost, Pipe, createNailyWebApplication } from "@naily/web";
import { ExpressAdapter } from "@naily/web-express";

@Pipe()
class TestPipe implements INailyWebImpl.WebPipe {
  transform(value: any, metadata: NailyWebArgumentHost.PipeArgumentHost) {
    console.log(metadata.dataProvider);
  }
}

@Injectable()
export class TestService {}

@Controller()
export class MainController {
  @Autowired
  private readonly testService: TestService;
}

createNailyWebApplication(new ExpressAdapter()).listen(3000, (port) => {
  console.log(`Listening on port http://localhost:${port}`);
});
