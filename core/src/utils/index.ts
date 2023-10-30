import { NailyIOCWatermark } from "../constants";
import { NContainer, RxType, Type } from "../typings";
import { NConfigure } from "../typings/value.typing";

interface NCreateFactoryClassDecoratorClass {
  type: "class" | "constant";
  factories: NContainer[];
  token: string;
  beforeExecute?: (target: Type) => void;
}

interface NCreateFactoryClassDecoratorConstant {
  type: "constant";
  factories: NContainer[];
  token: string;
  value: any;
  beforeExecute?: (target: Type) => void;
}

interface NCreateFactoryClassDecoratorConfig {
  type: "config";
  factories: NContainer[];
  token: string;
  beforeExecute?: (target: Type) => void;
}

export function createFactoryClassDecorator<T>(
  options: NCreateFactoryClassDecoratorClass | NCreateFactoryClassDecoratorConstant | NCreateFactoryClassDecoratorConfig
) {
  switch (options.type) {
    case "class":
      return (target: Type<T>) => {
        if (options.beforeExecute) options.beforeExecute(target);
        const hasToken = Reflect.getMetadata(NailyIOCWatermark.INJECTABLE, target);
        if (!hasToken) Reflect.defineMetadata(NailyIOCWatermark.INJECTABLE, options.token, target);
        options.factories.forEach((factory) => factory.insertClass(target));
      };
    case "constant":
      return (target: Type<T>) => {
        if (options.beforeExecute) options.beforeExecute(target);
        options.factories.forEach((factory) => factory.insertConstant(options.token, (options as NCreateFactoryClassDecoratorConstant).value));
      };
    case "config":
      return (target: RxType<T>) => {
        if (options.beforeExecute) options.beforeExecute(target);
        Reflect.defineMetadata(NailyIOCWatermark.CONFIGURATION, true, target);
        options.factories.forEach((factory) => {
          factory.insertConfig(options.token, (new target() as NConfigure).getConfigurationObject());
        });
      };
  }
}
