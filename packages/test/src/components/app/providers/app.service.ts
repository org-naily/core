import { Autowired, Injectable } from "@naily/core";
import { TestService } from "./test.service";

@Injectable()
export class AppService {
  @Autowired
  private readonly testService: TestService;

  getName() {
    return this.testService.getName();
  }
}
