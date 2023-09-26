import { injectableContainer } from "../../common/container";
import { WATERMARK } from "../../constants/key";
import { Type } from "../../typings";
import { IContainer } from "../../typings/ioc.typing";
import { checkInjectable } from "../../utils/checkInjectable";

export function Injectable(target: Type) {
  const params: Type[] = Reflect.getMetadata("design:paramtypes", target);

  const initizalizedParams: any[] = [];
  if (params) {
    params.forEach((param, index) => {
      if (!checkInjectable(param)) throw new Error(`${target.name} is not injectable.`);
      const childrenClassMetadata: IContainer = Reflect.getMetadata(WATERMARK.INJECTABLE, param);
      initizalizedParams[index] = childrenClassMetadata.newed;
    });
  }

  const metadata: IContainer = {
    target,
    newed: new target(...initizalizedParams),
  };

  Reflect.defineMetadata(WATERMARK.INJECTABLE, metadata, target);
  injectableContainer.push(metadata);
}
