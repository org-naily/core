import { Controller } from "@naily/web";
import { Configure, NailyConfigure, Value } from "@naily/conf";

@Configure(NailyConfigure)
@Controller()
export class AppController {
  @Value("test")
  private readonly test: string;
}
