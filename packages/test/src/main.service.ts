import { Autowired, Bean, Injectable } from "@naily/core";
import { ListenService } from "./listen.service";

@Injectable()
export class MainService {
  @Autowired
  private a: ListenService;

  @Bean([ListenService], [ListenService])
  testMethod() {
    console.log(this.a);
    return "testMethod return value";
  }
}
