import "reflect-metadata";

export const enum NailyIocWatermark {
  INJECTABLE = "__naily_ioc_injectable__",
  SCOPE = "__naily_ioc_scope__",
  ACTION = "__naily_ioc_action__",
}

export const enum Scope {
  SINGLETON = "__naily_ioc_singleton__",
  TRANSIENT = "__naily_ioc_transient__",
}
