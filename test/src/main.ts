import { NailyWebFactory } from "@naily/web";
import { ExpressAdapter, logger } from "@naily/web-express";
import * as CookieParser from "cookie-parser"
import { NextFunction, Request, Response, json, urlencoded } from "express";

import "./app.controller";

new NailyWebFactory()
  .createExpApplication<Request, Response, NextFunction>(ExpressAdapter)
  .useMiddleware(json())
  .useMiddleware(urlencoded({ extended: true }))
  .useMiddleware(CookieParser())
  .useMiddleware(logger())
  .run()
  .then((port) => {
    console.log(`Server is running on http://localhost:${port}`);
  });
