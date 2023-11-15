import { Injectable, ScopeEnum } from "@naily/core";

@Injectable({ scope: ScopeEnum.PROTOTYPE })
export class MainService {
  constructor() {
    console.log("MainService created");
  }

  getHello() {
    return "Hello World!";
  }
}
