import { Aspect, INailyBeanAfterExecute, INailyBeanBeforeExecute, INailyBeanContext, INailyBeanContextAfterExecute, Injectable } from "@naily/core";

@Aspect()
export class ListenerAspect implements INailyBeanBeforeExecute, INailyBeanAfterExecute {
  beforeExecute(context: INailyBeanContext): void | Promise<void> {}

  afterExecute(context: INailyBeanContextAfterExecute): void | Promise<void> {
    console.log(context.getArgs());
  }
}
