import { Type } from "@/typings";
import { NailyWatermark } from "@/constants";
import { NailyFactory } from "./factory.class";
import { NailyRepository } from "./repository.class";

export abstract class NailyBaseFactory {
  constructor(protected readonly configuration: Partial<NIOC.BaseFactoryOptions> = { EnableComponent: true }) {
    if (configuration.EnableComponent) this.initComponent();
  }

  protected initComponent() {
    function getAllProviders(classElement: NIOC.ClassElement, providers: Type[] = []): Type[] {
      if (classElement.type !== "class") return providers;
      const componentMetadata = new NailyFactory(classElement.target).getComponentOptions();
      if (!componentMetadata) return providers;
      providers.push(...componentMetadata.Exports);
      componentMetadata.Imports.forEach((imported) => {
        const { Token } = new NailyFactory(imported).getInjectableOptionsOrThrow();
        const importedElement = NailyRepository.getClassElement(Token);
        providers.push(...getAllProviders(importedElement, providers));
      });
      return providers;
    }

    for (const [token, element] of NailyRepository.map) {
      if (element.type !== "class") continue;

      const Factory = new NailyFactory(element.target);
      const componentMetadata = Factory.getComponentOptions();
      if (!componentMetadata) continue;
      const Element = NailyRepository.getClassElement(token);
      componentMetadata.Exports.forEach((exported) => {
        if (!componentMetadata.Providers.includes(exported)) {
          throw new Error(`The provider ${exported.name} is not included in the exports of ${element.target.name}.`);
        }
      });
      const AllProviders = getAllProviders(Element, componentMetadata.Providers);

      for (const Provider of componentMetadata.Providers) {
        const Factory = new NailyFactory(Provider);
        const propertyKeys = Factory.getPrototypeKeys();

        KEY: for (const propertyKey of propertyKeys) {
          const isInject: Type = Reflect.getMetadata(NailyWatermark.INJECT, Provider.prototype, propertyKey);
          if (!isInject) continue KEY;

          if (!AllProviders.includes(isInject)) {
            throw new Error(`The provider ${isInject.name} is not included in the providers of ${element.target.name}.`);
          }
        }
      }
    }
  }
}
