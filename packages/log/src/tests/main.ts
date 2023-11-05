import { DefaultLogger } from "../classes/default.logger";
import { UseLogger } from "../decorators/use.decorator";

class TestLogger extends DefaultLogger {
  debug(message: string): void {
    console.log(`[DEBUG] ${message}`);
  }
}

@UseLogger(TestLogger)
class Test {
  constructor() {
    new DefaultLogger(Test).debug("Hello, World!");
  }
}

new Test();
