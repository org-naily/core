import * as md5 from "md5";

export function generateKey() {
  return md5(`${Math.random()} + ${new Date().getTime()}`);
}
