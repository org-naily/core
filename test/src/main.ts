import "./main.controller.js";
import { Server } from "http";
import { Logger } from "@naily/core";
import { NailyExpWebFactory } from "@naily/web";
import { ExpressAdapter } from "@naily/web-express";
import { json, urlencoded } from "express";

NailyExpWebFactory.create(new ExpressAdapter())
  .useMiddleware(json())
  .useMiddleware(urlencoded({ extended: true }))
  .listen<Server>(3999, (port) => {
    new Logger().verbose(`Server is running on http://localhost:${port}`);
  });
