import { NailyIOCWatermark } from "../constants";
import { NContainer, Type } from "../typings";

interface NCreateFactoryClassDecoratorClass {
  type: "class" | "constant";
  factories: NContainer<Object>[];
  token: string;
  beforeExecute?: (target: Type) => void;
}

interface NCreateFactoryClassDecoratorConstant {
  type: "constant";
  factories: NContainer<Object>[];
  token: string;
  value: any;
  beforeExecute?: (target: Type) => void;
}

export function createFactoryClassDecorator<T>(options: NCreateFactoryClassDecoratorClass | NCreateFactoryClassDecoratorConstant) {
  return (target: Type<T>) => {
    if (options.beforeExecute) options.beforeExecute(target);
    if (options.type === "class") {
      const hasToken = Reflect.getMetadata(NailyIOCWatermark.INJECTABLE, target);
      if (!hasToken) Reflect.defineMetadata(NailyIOCWatermark.INJECTABLE, options.token, target);
      options.factories.forEach((factory) => factory.insertClass(target));
    } else if (options.type === "constant") {
      options.factories.forEach((factory) => factory.insertConstant(options.token, (options as NCreateFactoryClassDecoratorConstant).value));
    }
  };
}
