import { Autowired, Injectable } from "@naily/core";
import { Controller, createNailyWebApplication } from "@naily/web";
import { ExpressAdapter } from "@naily/web-express";

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
