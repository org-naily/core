import { Injectable, UseAction } from "@naily/core";
import { TestAction } from "./test.action.js";

@Injectable("TestService")
@UseAction(TestAction)
export class TestService {
  constructor(private readonly testAction: TestAction) {}
}
