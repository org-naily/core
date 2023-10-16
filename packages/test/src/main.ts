import { Logger } from "@naily/core";
import { createWebServer } from "@naily/web";
import { ExpressAdapter } from "@naily/web-express";

createWebServer(ExpressAdapter).listen(3000, () => {
  new Logger("My APP").info("App is running at http://localhost:3000");
});
