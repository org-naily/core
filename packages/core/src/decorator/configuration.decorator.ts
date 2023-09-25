/*
 * @Author: Zero的Mac 1203970284@qq.com
 * @Date: 2023-09-25 00:04:54
 * @LastEditors: Zero的Mac 1203970284@qq.com
 * @LastEditTime: 2023-09-25 13:48:22
 * @FilePath: /v5/packages/core/src/decorator/configuration.decorator.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { CONFIGURATION_WATERMARK, CONTROLLER_WATERMARK } from "../constant/constant";
import { IConfiguration, IConfigurationBooter, NailyControllerAdapter, Type } from "../typings";
import { injectableContainer } from "../container/container";
import { InitializeMethod } from "../classes/web/initialize.class";

namespace ConfigurationNamespace {
  function initializeWeb(ControllerAdapter: Type<NailyControllerAdapter>) {
    const adapter = new ControllerAdapter();

    injectableContainer.forEach(({ object, target }) => {
      const controllerMetadata: string = Reflect.getMetadata(CONTROLLER_WATERMARK, target);
      if (!controllerMetadata) return;
      const controllerMethodKeys: (string | symbol)[] = Reflect.ownKeys(target.prototype).filter((item) => (item === "constructor" ? undefined : item));
      controllerMethodKeys.forEach((item) => {
        const singleMethod = object[item];
        new InitializeMethod(adapter, controllerMetadata, object, item, singleMethod, target)
          .initGet()
          .initPost()
          .initPut()
          .initDelete()
          .initPatch()
          .initHead()
          .initOptions()
          .initTrace()
          .initAll();
      });
    });

    return adapter;
  }

  export function Configuration(configuration: IConfiguration = {}) {
    return (target: Type<IConfigurationBooter>) => {
      Reflect.defineMetadata(CONFIGURATION_WATERMARK, configuration, target);
      const newed = new target();
      const port = newed.main();

      if (configuration.controllerAdapter) {
        const adapter = initializeWeb(configuration.controllerAdapter);
        adapter.listenerIntercept(port);
      }
    };
  }
}

export const Configuration = ConfigurationNamespace.Configuration;
