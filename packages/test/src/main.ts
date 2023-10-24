import { Autowired, Injectable } from "@naily/core";

@Injectable()
export class TestService {}

@Injectable()
export class MainService {
  @Autowired
  private readonly testService: TestService;
}
