import { Component, INailyComponentInit } from "@naily/core";
import { AppService } from "./providers/app.service";
import { TestService } from "./providers/test.service";

@Component({
  providers: [AppService, TestService],
})
export class AppComponent implements INailyComponentInit {
  constructor() {}

  public onComponentInit() {}
}
