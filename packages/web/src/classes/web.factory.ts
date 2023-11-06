import { NailyFactory } from "@naily/core";
import { NailyWebWatermark } from "../constants";
import { NExpAdapter } from "../typings";
import { IMethod } from "../typings/method.typing";

export class NailyExpWebFactory {
  private constructor(private readonly adapter: NExpAdapter) {}

  public static create(adapter: NExpAdapter): NailyExpWebFactory {
    const map = NailyFactory.container.getMap().values();
    for (const item of map) {
      if (item.type !== "class") continue;
      const controller: string = Reflect.getMetadata(NailyWebWatermark.CONTROLLER, item.target);
      if (!controller) continue;
    }

    return new NailyExpWebFactory(adapter);
  }

  public listen(port: number, callBack: (port: number) => void) {
    const elements = NailyFactory.container.getMap().values();
    Out: for (const item of elements) {
      if (item.type !== "class") continue;
      const controllerPath: string = Reflect.getMetadata(NailyWebWatermark.CONTROLLER, item.target);
      if (!controllerPath) continue Out;
      const pipe = NailyFactory.pipe(item.target);
      const ownKey = pipe.getPrototypeOwnkeys();

      In: for (const key of ownKey) {
        if (typeof item.instance[key] !== "function") continue In;
        const methods: IMethod[] = Reflect.getMetadata(NailyWebWatermark.METHOD, item.target.prototype, key) || [];
        methods.forEach((method) => {
          const path = `${controllerPath}${method.path}`;
          this.adapter.handler(path, method.method, () => {
            return item.instance[key]();
          });
        });
      }
    }
    return this.adapter.listen(port, callBack);
  }
}
