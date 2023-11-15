import { Configuration, Value } from "@naily/core";

@Configuration
export class MainConfiguration {
  @Value("test")
  private readonly test: string;

  constructor() {}
}
