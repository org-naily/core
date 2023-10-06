import { Component, Type } from "@naily/core";
import { RootService } from "./root.service";
import { RootController } from "./root.controller";

@Component({
  providers: [RootController, RootService],
})
export class RootModule {}
