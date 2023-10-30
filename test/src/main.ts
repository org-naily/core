import { Injectable, Constant, Scope, Autowired, NailyFactoryContext } from "@naily/core";

@Constant("T", "hello world")
export default class {}

@Injectable(Scope.Transient)
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

console.log(NailyFactoryContext.getClassOneByTokenOrThrow("app"));
