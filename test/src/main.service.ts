import { Injectable } from "@naily/core";

@Injectable()
export class MainService {
  public getHello() {
    return "Hello World!";
  }
}
