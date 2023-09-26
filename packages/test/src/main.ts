import { Component, Injectable } from "@naily/core";

@Injectable
export class TestService3 {
  getString() {
    return "hello world";
  }
}

@Injectable
export class TestService2 {
  constructor(private readonly testService: TestService3) {
    console.log(testService.getString());
  }
}

@Injectable
export class TestService {
  constructor(private readonly testService: TestService2) {
    console.log(testService);
  }
}

@Component({
  providers: [TestService3],
})
export class TestComponent {}
