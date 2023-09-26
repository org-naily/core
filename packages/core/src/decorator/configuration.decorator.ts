/*
 * @Author: Zero的Mac 1203970284@qq.com
 * @Date: 2023-09-25 00:04:54
 * @LastEditors: Zero的Mac 1203970284@qq.com
 * @LastEditTime: 2023-09-26 08:56:26
 * @FilePath: /v5/packages/core/src/decorator/configuration.decorator.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { join } from "path";
import { parse } from "yaml";
import { readFileSync, existsSync, mkdirSync, writeFileSync } from "fs";
import { CONFIGURATION_WATERMARK, CONTROLLER_WATERMARK, VALUE_WATERMARK } from "../constant/constant";
import { IConfiguration, IConfigurationBooter, NailyControllerAdapter, Type } from "../typings";
import { injectableContainer } from "../container/container";
import { InitializeMethod } from "../classes/web/initialize.class";
import { deleteDirSync } from "../utils/rmDir";
import { PropertiesParser } from "../classes/properties.class";

namespace ConfigurationNamespace {
  function getMethodKeys(target: Type): (string | symbol)[] {
    return Reflect.ownKeys(target.prototype).filter((item) => (item === "constructor" ? undefined : item));
  }

  function initializeValue() {
    injectableContainer.forEach(({ object }, index) => {
      const valueKeys: { key: string; propertyKey: string | symbol }[] = Reflect.getMetadata(VALUE_WATERMARK, object);
      if (!valueKeys) return;
      valueKeys.forEach(({ key, propertyKey }) => {
        const value = PropertiesParser.getPropertiesValue(key);
        injectableContainer[index].object[propertyKey] = value;
      });
    });
  }

  function initializeWeb(ControllerAdapter: Type<NailyControllerAdapter>, adapter: NailyControllerAdapter) {
    injectableContainer.forEach((_item, index) => {
      const controllerMetadata: string = Reflect.getMetadata(CONTROLLER_WATERMARK, injectableContainer[index].target);
      if (!controllerMetadata) return;
      const controllerMethodKeys = getMethodKeys(injectableContainer[index].target);
      controllerMethodKeys.forEach((item) => {
        new InitializeMethod(
          adapter,
          controllerMetadata,
          injectableContainer[index].object,
          item,
          injectableContainer[index].object[item],
          injectableContainer[index].target
        )
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
  }

  function initializeMounted() {
    injectableContainer.forEach(({ object }, index) => {
      if (object.handleMounted) {
        object.handleMounted();
      }
    });
  }

  function LoadConfig() {
    const path = join(process.cwd(), "naily.yaml");
    const typeFolderPath = join(process.cwd(), ".naily");
    const typePath = join(process.cwd(), ".naily/naily.d.ts");

    if (!existsSync(path)) throw new Error("naily.yaml not found");
    const configData: object = parse(readFileSync(path).toString());

    const parsed = new PropertiesParser().parse(configData);
    // 去除数组的[] 替换,为|
    const typing = JSON.stringify(parsed).replace("[", "").replace("]", "").replace(/,/g, "|");

    function makeFile() {
      mkdirSync(typeFolderPath);
      const typeData = `declare global{type NailyConfig=${typing}} export {};`;
      writeFileSync(typePath, typeData, {
        encoding: "utf-8",
      });
    }

    if (!existsSync(typePath)) {
      makeFile();
    } else {
      deleteDirSync(typeFolderPath);
      makeFile();
    }
  }

  export function Configuration(configuration: IConfiguration = {}) {
    LoadConfig();
    return (target: Type<IConfigurationBooter>) => {
      Reflect.defineMetadata(CONFIGURATION_WATERMARK, configuration, target);
      const newed = new target();
      const port = newed.main();

      if (configuration.controllerAdapter) {
        const adapterNewed = new configuration.controllerAdapter();
        // 1: 加载配置文件
        initializeValue();
        // 2: 加载web适配器
        initializeWeb(configuration.controllerAdapter, adapterNewed);
        adapterNewed.listenerIntercept(port);
        // 3: 调用mounted钩子
        initializeMounted();
      }
    };
  }
}

export const Configuration = ConfigurationNamespace.Configuration;
