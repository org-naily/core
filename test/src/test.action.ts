import { Injectable, NAction } from "@naily/core";

@Injectable("TestAction")
export class TestAction implements NAction {
  beforeInit(injectableHost: NAction.BeforeInitHost): void {
    console.log(injectableHost.getTarget());
  }

  afterInit(injectableHost: NAction.AfterInitHost): void {
    console.log(injectableHost.getInstance());
  }
}
