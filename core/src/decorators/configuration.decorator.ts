import { NailyFactoryContext } from "../containers";
import { createFactoryClassDecorator } from "../utils";
import { NConfigure } from "../typings/value.typing";
import { generateToken } from "../utils/generateToken";

export function Configuration<T extends string>(token: T = generateToken() as T) {
  return createFactoryClassDecorator<NConfigure>({
    type: "config",
    factories: [NailyFactoryContext],
    token: token,
  });
}
