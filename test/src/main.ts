import { Injectable, NContainer, NailyFactoryContext, Constant, Scope, Autowired } from "@naily/core";

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
    this.testService.getHello();
  }
}

const classElement = NailyFactoryContext.getOneByToken("M") as NContainer.ClassElement<AppService>;
classElement.instance.getHello();
