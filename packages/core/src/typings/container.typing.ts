import { NailyLifeCircle } from "./common.typing";
import { RxType, Type } from "./util.typing";

export interface ContainerImpl {
  /**
   * Get all class
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/05
   * @return {*}  {IContainer}
   * @memberof ContainerImpl
   */
  getAll(): IContainer;
  /**
   * Get single class by key
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/05
   * @param {string} key
   * @return {*}  {IContainerBase}
   * @memberof ContainerImpl
   */
  getOneByKey(key: string): IContainerBase;
  /**
   * Foreach all class
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/05
   * @param {(item: IContainerBase, index: string) => void} callback
   * @memberof ContainerImpl
   */
  forEach(callback: (item: IContainerBase, index: string) => void): void;
  /**
   * Add a new class
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/05
   * @param {Type<NailyLifeCircle>} target
   * @memberof ContainerImpl
   */
  create(target: Type<NailyLifeCircle>): void;
}

export interface IContainerBase {
  target: Type<NailyLifeCircle>;
  newed: object;
}

export interface IContainer {
  [key: string]: IContainerBase;
}

export interface IRxContainerBase {
  target: RxType<NailyLifeCircle>;
  newed: object;
}

export interface IRxContainer {
  [key: string]: IRxContainerBase;
}
