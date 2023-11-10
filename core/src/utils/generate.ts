import md5 from "md5";

export function generateToken() {
  return md5(Math.random().toString() + new Date().getTime().toString());
}
