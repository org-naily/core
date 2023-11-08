import { Catch, NFilter } from "@naily/web";
import { TestError } from "./test.error.js";
import { Response } from "express";

@Catch(TestError)
export class MainFilter implements NFilter {
  catch(error: TestError, host: NFilter.ArgumentHost): void | Promise<void> {
    host.getResponse<Response>().send(error.twd);
  }
}
