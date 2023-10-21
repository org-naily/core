import { Logger } from "@naily/core";
import { createExpressWebServer } from "@naily/web";
import { ExpressAdapter } from "@naily/web-express";
import * as CookieParser from "cookie-parser";
import * as BodyParser from "body-parser";

createExpressWebServer(ExpressAdapter)
  .use(CookieParser())
  .use(BodyParser.json())
  .listen(3000, () => {
    new Logger().info("App is running at http://localhost:3000");
  });
