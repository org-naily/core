import { NHttpMethod, NUpperCaseHttpMethod } from "..";

export function convertLowcase(str: NHttpMethod): NUpperCaseHttpMethod {
  if (str === "all") {
    return "ALL";
  } else if (str === "delete") {
    return "DELETE";
  } else if (str === "get") {
    return "GET";
  } else if (str === "head") {
    return "HEAD";
  } else if (str === "options") {
    return "OPTIONS";
  } else if (str === "patch") {
    return "PATCH";
  } else if (str === "post") {
    return "POST";
  } else if (str === "put") {
    return "PUT";
  } else if (str === "trace") {
    return "TRACE";
  } else {
    return;
  }
}

export function convertUppercase(str: NUpperCaseHttpMethod): NHttpMethod {
  if (str === "ALL") {
    return "all";
  } else if (str === "DELETE") {
    return "delete";
  } else if (str === "GET") {
    return "get";
  } else if (str === "HEAD") {
    return "head";
  } else if (str === "OPTIONS") {
    return "options";
  } else if (str === "PATCH") {
    return "patch";
  } else if (str === "POST") {
    return "post";
  } else if (str === "PUT") {
    return "put";
  } else if (str === "TRACE") {
    return "trace";
  } else {
    return;
  }
}
