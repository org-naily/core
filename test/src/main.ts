import { Injectable, NContainer, NailyFactoryContext, Constant, Scope, Autowired, Logger } from "@naily/core";

@Constant("T", "hello world")
export default class {}

@Injectable(Scope.Singleton, "S")
export class TestService {
  getHello() {
    return "hello world";
  }
}

@Injectable({
  token: "M",
})
export class AppService {
  @Autowired
  private readonly testService: TestService;

  getHello() {
    return this.testService.getHello();
  }
}

console.log(NailyFactoryContext);
