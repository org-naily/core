import { NailyLogger } from "@naily/core";
import { Request, Response, NextFunction } from "express";

export function logger() {
  return (req: Request, res: Response, next: NextFunction) => {
    const time = new Date().getTime();
    req.once("end", () => {
      const diff = new Date().getTime() - time;
      new NailyLogger().log(`[${req.method}] ${req.url} (${diff}ms)`);
    });
    next();
  };
}
