/*
 * @Author: Zero的Mac 1203970284@qq.com
 * @Date: 2023-09-24 22:50:21
 * @LastEditors: Zero的Mac 1203970284@qq.com
 * @LastEditTime: 2023-09-26 00:23:05
 * @FilePath: /v5/packages/core/src/test/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { Configuration, Controller, Get, IConfigurationBooter, Injectable, Post, onInit, Value } from "..";
import { ExpressAdapter } from "./adapter/express.adapter";

@Injectable
export class TestService implements onInit {
  handleInit() {
    console.log("handleInit");
  }
}

@Controller()
export class TestController {
  @Value("typeorm.app.ast.saaa")
  private readonly strTest: string;

  @Get()
  @Post()
  getHello() {
    return this.strTest;
  }
}

@Configuration({
  controllerAdapter: ExpressAdapter,
})
export class BootStrap implements IConfigurationBooter {
  main(): number {
    return 4000;
  }
}
