import express from "express";

export class NailyExpressFactory {
  constructor(private readonly app = express()) {}

  public listen(port: number, callBack?: (port: number) => void) {
    this.app.listen(port, () => (callBack ? callBack(port) : void 0));
  }
}
