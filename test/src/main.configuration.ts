import { Configuration, Value, NConfigure, NailyFactory } from "@naily/core";

@Configuration
export class TestConfiguration implements NConfigure {
  async getConfigure(jexl: string, builder: any) {
    return "AAP";
  }
}

@Configuration
export class MainConfiguration {
  @Value("test")
  readonly test: string;

  constructor() {
    setInterval(() => {
      console.log(this.test);
    }, 1000);
  }
}
