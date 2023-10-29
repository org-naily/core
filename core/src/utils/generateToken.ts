import * as md5 from "md5";

export function generateToken() {
  return md5(Math.random().toString() + Date.now().toString());
}
