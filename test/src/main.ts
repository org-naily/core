import { Injectable, NLifeCycle } from "@naily/core";
import { ExpressAdapter } from "@naily/web-express";
import { NextFunction, Request, Response, json, urlencoded } from "express";
import { NailyWebFactory, Controller, Get, Post } from "@naily/web";

@Injectable()
export class AppService implements NLifeCycle {
  public getHello(): number {
    return 100;
  }
}

@Controller()
export class AppController {
  @Get()
  @Post()
  public async getHello() {
    return `Hello World!`;
  }
}

new NailyWebFactory()
  .createExpApplication<Request, Response, NextFunction>(ExpressAdapter)
  .useMiddleware(json())
  .useMiddleware(urlencoded({ extended: true }))
  .run()
  .then((port) => {
    console.log(`Server is running on http://localhost:${port}`);
  });
