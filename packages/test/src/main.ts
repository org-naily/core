import { Autowired, Injectable, NailyFactoryConstant, NailyFactoryContext } from "@naily/core";

@Injectable("TestService")
export class TestService {}

@Injectable("MainService")
export class MainService {
  @Autowired
  private readonly testService: TestService;
}
