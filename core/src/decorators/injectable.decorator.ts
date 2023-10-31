import "reflect-metadata";
import { NAction, NLifeCycle, RxType, Type } from "../typings/common.typing";
import { NailyContainer } from "../classes/base.class";
import { NailyIocWatermark, Scope } from "../constants/watermark.constant";

export function Class(token?: string | symbol, scope?: Scope): ClassDecorator;
export function Class(token?: string | symbol, scope: Scope = Scope.SINGLETON) {
  return (target: Type<NLifeCycle>) => {
    const oldToken: string | symbol = token || Reflect.getMetadata(NailyIocWatermark.INJECTABLE, target);
    if (oldToken) throw new Error(`Token ${target.name} already exists in container, and the token is ${String(oldToken)}`);
    NailyContainer.addClass(target, token, scope);
  };
}

export function UseAction(...action: RxType<NAction>[]) {
  return (target: Type<NLifeCycle>) => {
    const hasToken: string | symbol | undefined = Reflect.getMetadata(NailyIocWatermark.INJECTABLE, target);
    if (hasToken) throw new Error(`${target.name} already have @Class, please put it after @UseAction`);

    const oldAction = Reflect.getMetadata(NailyIocWatermark.ACTION, target);
    if (oldAction) throw new Error(`@UseAction is already used in ${target.name}. Please check your code.`);
    Reflect.defineMetadata(NailyIocWatermark.ACTION, action, target);
  };
}
