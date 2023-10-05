import { NailyLifeCircle } from "./common.typing";
import { RxType, Type } from "./util.typing";

export interface ContainerImpl {
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
