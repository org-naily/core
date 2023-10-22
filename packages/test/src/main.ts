import { NailyExpressFactory } from "@naily/web-express";

new NailyExpressFactory().listen(3000, (port) => {
  console.log(`Listening on port ${port}`);
});
