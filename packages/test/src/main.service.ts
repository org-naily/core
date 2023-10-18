import { Injectable, Value } from "@naily/core";

@Injectable()
export class MainService {
  @Value("naily", true)
  private readonly aaa: any;

  testMethod() {
    return this.aaa;
  }
}
