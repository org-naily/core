import * as md5 from "md5";

export function generateToken() {
  return md5(String(Math.random()) + String(Date.now()));
}
