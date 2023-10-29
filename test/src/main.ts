import { Inject, Injectable, NContainer, NailyFactoryContext, Scope, Constant } from "@naily/core";

@Constant("T", "hello world")
export default class {}

@Injectable({
  token: "M",
})
export class AppService {
  @Inject("T")
  private readonly constant: string;

  getHello() {
    return this.constant;
  }
}

const classElement = NailyFactoryContext.getOneByToken("M") as NContainer.ClassElement;
console.log(classElement.instance.getHello());
