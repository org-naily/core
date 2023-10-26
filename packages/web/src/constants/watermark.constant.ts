export const enum NailyWebConstant {
  CONTROLLER = "__naily:controller__",
  GATEWAY = "__naily:gateway__",
  PIPE = "__naily:pipe__",
  GUARD = "__naily:guard__",
  EXCEPTION_FILTER = "__naily:exception_filter__",
}

export const enum NailyWebMethodConstant {
  GET = "__naily:web:get__",
  POST = "__naily:web:post__",
}

export const enum NailyWebParamConstant {
  REQUEST = "__naily:web:request__",
  RESPONSE = "__naily:web:response__",
  NEXT = "__naily:web:next__",
  CONTEXT = "__naily:web:context__",
  PARAMS = "__naily:web:params__", // ! Metadata is an array, contain all pipes
  QUERY = "__naily:web:query__", // ! Metadata is an array, contain all pipes
  BODY = "__naily:web:body__", // ! Metadata is an array, contain all pipes
  HEADERS = "__naily:web:headers__",
  COOKIES = "__naily:web:cookies__",
  IP = "__naily:web:ip__",
}
