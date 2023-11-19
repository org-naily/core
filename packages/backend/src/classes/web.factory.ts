import { NailyWebWatermark } from "@/constants";
import { NailyMapper, NailyWebConfiguration, ReflectedType } from "@/typings/web.typing";
import { NailyFactory, NailyRepository } from "@naily/core";

export class NailyWebFactory {
  public static mapper: NailyMapper[] = [];

  constructor(private readonly configuration: NailyWebConfiguration = {}) {
    this.initAllControllers();
  }

  private initAllControllers() {
    for (const [token, element] of NailyRepository.map) {
      if (element.type !== "class") continue;
      const Factory = new NailyFactory(element.target);
      const controllerPaths: string[] = Reflect.getMetadata(NailyWebWatermark.CONTROLLER, element.target) || [];
      if (controllerPaths.length === 0) continue;
      NailyWebFactory.mapper.push({
        token: token,
        controllerPaths: controllerPaths,
        mapper: Factory.getPrototypeKeys()
          .map((propertyKey) => {
            if (typeof element.instance[propertyKey] !== "function") return undefined;
            const methodMetadata: NailyMapper.MethodMapper[] =
              Reflect.getMetadata(NailyWebWatermark.METHOD, element.target.prototype, propertyKey) || undefined;
            if (!methodMetadata) return undefined;

            const returnType: ReflectedType = Reflect.getMetadata("design:returntype", element.target.prototype, propertyKey);
            const paramMetadata: NailyMapper.ParamMapper[] =
              Reflect.getMetadata(NailyWebWatermark.PARAM, element.target.prototype, propertyKey) || [];

            return {
              propertyKey: propertyKey,
              returnType: returnType,
              methods: methodMetadata,
              paramMapper: paramMetadata,
            };
          })
          .filter((value) => (value === undefined ? undefined : value)),
      });
    }
  }
}
