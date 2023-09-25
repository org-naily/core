/*
 * @Author: Zero的Mac 1203970284@qq.com
 * @Date: 2023-09-25 00:30:56
 * @LastEditors: Zero的Mac 1203970284@qq.com
 * @LastEditTime: 2023-09-25 14:04:20
 * @FilePath: /v5/packages/core/src/test/adapter/express.adapter.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { ControllerAdapter, AdapterMethod, AdapterRequest, AdapterResponse, NailyControllerAdapter, NailyAdapterContext, NailyAdapterHost } from "../..";
import * as express from "express";
import { Request, Response } from "express";

@ControllerAdapter
export class ExpressAdapter implements NailyControllerAdapter {
  private app = express();

  methodIntercept(host: NailyAdapterHost<Request, Response>, ctx: NailyAdapterContext): void | Promise<void> {
    this.app[host.method](host.path, async (req, res) => {
      const newRequest = host.request(req);
      res.send(host.response);
    });
  }

  listenerIntercept(port: number) {
    this.app.listen(port);
  }
}
