import { Injectable, Value } from "@naily/core";

@Injectable()
export class TestService {
  @Value("app.name", true)
  private readonly name: string;

  public getName() {
    return this.name;
  }
}
