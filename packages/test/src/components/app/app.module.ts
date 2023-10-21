import { Component } from "@naily/core";
import { AppController } from "./controllers/app.controller";
import { AppService } from "./providers/app.service";

@Component({
  providers: [AppService],
})
export class AppComponent {}
