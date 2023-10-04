import { NailyLifeCircle, Type } from "../typings";
import { isClass } from "is-class";
import { CheckerUtils } from "../utils";
import { WATERMARK } from "../constants/watermark.constant";

interface IContainerBase {
  target: Type<NailyLifeCircle>;
  newed: object;
}

interface IContainer {
  [key: string]: IContainerBase;
}

export class InjectableContainer {
  private static readonly injectableContainer: IContainer = {};

  /**
   * Get all injectable class
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/04
   * @return {*}  {IContainer}
   * @memberof InjectableContainer
   */
  public getAll(): IContainer {
    return InjectableContainer.injectableContainer;
  }

  /**
   * Foreach all injectable class
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/04
   * @param {(item: IContainerBase, index: string) => void} callback
   * @memberof InjectableContainer
   */
  public forEach(callback: (item: IContainerBase, index: string) => void): void {
    for (const item in InjectableContainer.injectableContainer) {
      callback(InjectableContainer.injectableContainer[item], item);
    }
  }

  /**
   * Get single injectable class by key
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/04
   * @param {string} key
   * @return {*}  {IContainerBase}
   * @memberof InjectableContainer
   */
  public getOneByKey(key: string): IContainerBase {
    return InjectableContainer.injectableContainer[key];
  }

  /**
   * Add a new injectable class
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/04
   * @param {Type} target
   * @memberof InjectableContainer
   */
  public create(target: Type<NailyLifeCircle>): void {
    const injectableKey = Reflect.getMetadata(WATERMARK.INJECTABLE, target);

    // 装载parameter
    const paramMetadata: Type[] = Reflect.getMetadata("design:paramtypes", target) || [];
    const param: object[] = [];
    paramMetadata.forEach((item) => {
      const paramInjectableKey = CheckerUtils.getInjectableKey(item);
      if (!isClass(item) || !paramInjectableKey) {
        throw new Error(`${item.name} is not a @Injectable class. Please check ${target.name}'s parameter`);
      }
      param.push(this.getOneByKey(paramInjectableKey).newed);
    });

    const newed = new target(...param);
    if (newed.handleInit) newed.handleInit();

    // 装载@Inject和@Autowried
    const propertyKeys = Reflect.ownKeys(target.prototype).filter((item) => (item === "constructor" ? undefined : item));
    propertyKeys.forEach((item) => {
      const isInject = Reflect.getMetadata(WATERMARK.INJECT, newed, item);
      if (!isInject) return;
      const paramInjectableKey = CheckerUtils.getInjectableKey(target.prototype[item]);
      if (!paramInjectableKey) throw new Error(`${target.prototype[item].name} is not a @Injectable class.`);
      newed[item] = this.getOneByKey(paramInjectableKey).newed;
    });

    InjectableContainer.injectableContainer[injectableKey] = {
      target: target,
      newed: newed,
    };

    if (newed.handleMount) newed.handleMount();
  }
}
