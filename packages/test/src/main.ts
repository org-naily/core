import { After, Aspect, NAopAfterMeta } from "@naily/aop";

@Aspect()
export class TestService implements $.Impl.Aop.After {
  afterExecute(metadata: NAopAfterMeta) {
    console.log(metadata.getReturnValue());
  }
}

@Aspect()
export class MainService {
  @After(TestService)
  public getTestService() {
    console.log("getTestService called");
    return new Promise<true>((res) => {
      setTimeout(() => {
        res(true);
      }, 1000);
    });
  }

  public async getValue() {
    return await this.getTestService();
  }
}
