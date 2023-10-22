import md5 from "md5";

export namespace NailyUtil {
  export function generate_key() {
    return md5(Math.random().toString() + new Date());
  }
}
