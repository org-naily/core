import { componentContainer } from "../../common/container";
import { WATERMARK } from "../../constants/key";
import { ExType, Type } from "../../typings";
import { IComponentMetadata } from "../../typings/ioc.typing";
import { checkInjectable } from "../../utils/checkInjectable";

function addInjectableScope(injectable: Type, componentID: number) {
  let scope: number[] = Reflect.getMetadata(WATERMARK.INJECTABLESCOPE, injectable);
  if (!scope) scope = [];
  scope.push(componentID);
  Reflect.defineMetadata(WATERMARK.INJECTABLESCOPE, scope, injectable);
  return scope;
}

export function Component(metadata: IComponent = {}) {
  return (target: ExType) => {
    const paramMetadata: any[] = Reflect.getMetadata("design:paramtypes", target);
    if (paramMetadata && paramMetadata.length !== 0) throw new Error(`Component ${target.name} should not have any constructor parameters.`);

    const reflectData: IComponentMetadata = {
      metadata: metadata,
      target,
      newed: new target(),
    };
    const componentID = componentContainer.push(reflectData);
    Reflect.defineMetadata(WATERMARK.COMPONENT, reflectData, target);

    if (metadata.providers) {
      const scope: number[] = [];

      metadata.providers.forEach((provider, index) => {
        if (!checkInjectable(provider)) throw new Error(`Component ${target.name} providers[${index}] is not an injectable class.`);
        scope.push(...addInjectableScope(provider, componentID));
      });

      // 检测param注入的类们的scope是否一致
      metadata.providers.forEach((provider) => {
        const providerParams: Type[] = Reflect.getMetadata("design:paramtypes", provider) || [];

        providerParams.forEach((param) => {
          const paramScope: number[] = Reflect.getMetadata(WATERMARK.INJECTABLESCOPE, param) || [];
          // 检测scope是否有本Component 如果没有 则报错
          const compare = scope.filter((item) => {
            return !paramScope.includes(item);
          });
          if (compare.length !== 0) {
            throw new Error(
              `@Component ${target.name}'s ${provider.name} is inject a not-register-in-component-${target.name}'s provider: ${param.name}, please inject ${param.name} to ${target.name} first.`
            );
          }
        });
      });
    }
  };
}
