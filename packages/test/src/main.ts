import { Injectable, NailyFactoryContext } from "@naily/ioc";

function Before() {
  return <T extends Function>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {};
}

@Injectable("m")
export class MainService {
  @Before()
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

const instance = NailyFactoryContext.get("m").instance;
const method = instance["getTestService"];
Object.defineProperty(instance, "getTestService", {
  get() {
    console.log("get");
    return method;
  },
  set(v) {
    console.log("set");
  },
});
console.log(instance["getTestService"]());
