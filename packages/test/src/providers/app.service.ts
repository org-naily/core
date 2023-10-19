import { Injectable, Value } from "@naily/core";

@Injectable("AppService")
export class AppService {
  @Value("app.name")
  private readonly name: string;

  getName() {
    return this.name;
  }
}
