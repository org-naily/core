import { Injectable, Value } from "@naily/core";
import { NPipe } from "@naily/web";

@Injectable()
export class MainService implements NPipe {
  @Value("port")
  readonly test: string;

  transform(value: any, metadata: NPipe.Metadata) {
    console.log(value);
    console.log(metadata);
  }

  public getHello() {
    return "Hello World!";
  }
}
