import { NConfigure, Type } from "../typings";
import JEXL from "jexl";
import { NailyConfigure } from "../vendors/naily.configure";
import { NailyFactory } from "../classes";

function parseRealValue(str: any) {
  if (typeof str === "string") {
    return str.replace(/\$\{(.+?)\}/g, (match, $1) => {
      return JEXL.evalSync($1, {
        $Naily: {
          env: process.env,
        },
      });
    });
  } else {
    return str;
  }
}

export function Value(jexl: string = "", configure: Type<NConfigure> = NailyConfigure) {
  return (target: Object, propertyKey: string | symbol) => {
    Object.defineProperty(
      target,
      propertyKey,
      (() => {
        const pipe = NailyFactory.pipe(configure).createInstance();
        if (!pipe.isPromise) {
          return {
            get() {
              const allValue = pipe.getConfigure();
              if (!jexl) return allValue;
              const realValue = JEXL.evalSync(jexl, allValue);
              return parseRealValue(realValue);
            },
          };
        } else {
          return {
            async get() {
              const allValue = await pipe.getConfigure();
              if (!jexl) return allValue;
              const realValue = JEXL.evalSync(jexl, allValue);
              return parseRealValue(realValue);
            },
          };
        }
      })()
    );
  };
}
