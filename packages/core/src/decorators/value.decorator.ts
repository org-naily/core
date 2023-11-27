import { NailyRegistry } from "../classes";
import { NailyFactory } from "../classes/factory.class";
import { Type } from "../typings";
import { NConfigure } from "../typings/configure.typing";
import { NailyConfiguration } from "../vendors/naily.configuration";
import { Bean } from "./bean.decorator";

export function Value(jexl: string, configureOrOptions: Type<NConfigure> | Partial<NIOC.ValueMetadata> = NailyConfiguration) {
  return (target: Object, propertyKey: string | symbol) => {
    let value: any;
    if (typeof configureOrOptions === "object") {
      Bean(configureOrOptions)(target.constructor);
      if (!configureOrOptions.configure) configureOrOptions.configure = NailyConfiguration;
      const options = new NailyFactory(configureOrOptions.configure).getOptionsOrthrow();
      value = NailyRegistry.map.get(options.Token).configure.configureValue;
    } else {
      Bean()(target.constructor);
      const options = new NailyFactory(configureOrOptions).getOptionsOrthrow();
      value = NailyRegistry.map.get(options.Token).configure.configureValue;
    }

    target[propertyKey] = NailyRegistry.jexlInstance.evalSync(jexl, value);
  };
}
