import { ExpressAdapter } from "@naily/adapter-express";
import { Configuration, IConfigurationBooter, Value } from "@naily/core";

@Configuration({
  controllerAdapter: ExpressAdapter,
})
export class BootStrap implements IConfigurationBooter {
  @Value("str.test")
  main(): number {
    console.log("app已经在4000端口启动");
    return 4000;
  }
}
