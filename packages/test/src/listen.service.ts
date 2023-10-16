import { INailyBeanAfterExecute, INailyBeanBeforeExecute, INailyBeanContext, INailyBeanContextAfterExecute, Injectable } from "@naily/core";

@Injectable()
export class ListenService implements INailyBeanBeforeExecute, INailyBeanAfterExecute {
  beforeExecute(context: INailyBeanContext): void | Promise<void> {}

  afterExecute(context: INailyBeanContextAfterExecute): void | Promise<void> {
    console.log(context.getReturnValue());
  }
}
