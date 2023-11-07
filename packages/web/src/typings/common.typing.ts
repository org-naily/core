export const HttpMethod = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch",
  HEAD: "head",
  OPTIONS: "options",
  ALL: "all",
  TRACE: "trace",
} as const;
export type IHttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod];
