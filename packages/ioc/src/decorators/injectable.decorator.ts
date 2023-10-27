import "reflect-metadata";
import { NailyBaseFactory, createClassDecorator } from "../core";
import { NailyFactoryContext } from "../factories";

export function Injectable(token: string = NailyBaseFactory.generateToken()) {
  return createClassDecorator(
    [NailyFactoryContext],
    (target) => {
      target;
    },
    token
  );
}
