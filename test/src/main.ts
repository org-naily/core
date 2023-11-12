import { Injectable, NLifeCycle } from "@naily/core";
import { ExpressAdapter } from "@naily/web-express";
import { NextFunction, Request, Response } from "express";
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
  .useMiddleware((req, res, next) => {
    console.log("middleware");
    next();
  })
  .run((port) => {
    console.log(`Server is running on http://localhost:${port}`);
  });
