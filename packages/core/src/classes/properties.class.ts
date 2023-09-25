/*
 * @Author: Zero的Mac 1203970284@qq.com
 * @Date: 2023-09-25 22:53:27
 * @LastEditors: Zero的Mac 1203970284@qq.com
 * @LastEditTime: 2023-09-26 00:22:18
 * @FilePath: /v5/packages/core/src/classes/properties.class.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { readFileSync } from "fs";
import { join } from "path";
import { parse } from "yaml";

export class PropertiesParser {
  private checkArray(obj: object) {
    if (Array.isArray(obj)) throw new Error("naily.yaml can't use array");
  }

  private static getKeys(key: string) {
    return key.split(".");
  }

  private static getJson(): object {
    const path = join(process.cwd(), "naily.yaml");
    return parse(readFileSync(path).toString());
  }

  public static getPropertiesValue(key: string, parentData?: object) {
    let keyKeys = this.getKeys(key);
    let configs = this.getJson();

    let now: object;
    for (let i = 0; i < keyKeys.length; i++) {
      let single = keyKeys[i];
      if (now) {
        now = now[single];
        continue;
      }

      if (configs[single]) {
        now = configs[single];
        continue;
      }
    }

    return now;
  }

  public parse(obj: object, str: string[] = [], parentString?: string): string[] {
    for (const item in obj) {
      if (parentString) {
        // 如果有父字符串 那就检测属性内是否有对象
        if (typeof obj[item] === "object") {
          this.checkArray(obj[item]);
          // 如果有对象 那么就重新遍历这个对象
          this.parse(obj[item], str, `${parentString}.${item}`);
          // 遍历完成后 去除掉这个父字符串
          str = str.filter((item) => (item === parentString ? undefined : item));
        }
        // 如果有父字符串 那么就将父字符串与key拼接推到str里面
        str.push(`${parentString}.${item}`);
        continue;
      }

      if (typeof obj[item] === "object") {
        this.checkArray(obj[item]);
        // 如果是对象 那么就重新遍历这个对象
        this.parse(obj[item], str, item);
      } else {
        // 如果不是对象 那么就将key推到str里面
        str.push(item);
      }
    }
    return str;
  }
}
