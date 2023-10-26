import { NailyFactoryRepositoryGetter } from "../factories/get.factory";
import { Type } from "./common.typing";

export namespace INailyFactory {
  export interface INailyFactoryInstance<T extends Object = Object> {
    target: Type<T>;
    instance: T;
  }
  export interface INailyFactoryFilterOptions {
    filterKey?: string[];
    filterClassName?: string[];
  }
  export interface INailyFactoryImpl {
    /**
     * [EN]
     * ## Add a injectable to the factory
     * If the key is not specified, the key will be automatically obtained from the Reflect metadata.
     * If the key is specified, the key will be used as the key of the injectable.
     * If the key is specified and the key already exists in the factory, will throw an error.
     *
     * ---
     *
     * [ZH]
     * ## 将一个可注入类添加到工厂
     * 如果未指定key，将自动从Reflect元数据中获取key。
     * 如果指定了key，将使用key作为可注入类的key。
     * 如果指定了key，并且工厂中已经存在该key，将抛出错误。
     *
     * ---
     *
     * @author Zero <gczgroup@qq.com>
     * @date 2023/10/24
     * @param {Type} target The injectable class.
     * @param {string} [key] The key of the injectable. If not specified, will automatically get the Reflect key.
     * @return {INailyFactoryInstance}
     * @memberof INailyFactoryImpl
     */
    add(target: Type, key?: string): INailyFactoryInstance | void;
    /**
     * [EN]
     * ## Get a injectable from the factory
     *
     * ---
     *
     * [ZH]
     * ## 从工厂中获取一个可注入类
     *
     * ---
     *
     * @author Zero <gczgroup@qq.com>
     * @date 2023/10/24
     * @param {string} key The key of the injectable.
     * @return {INailyFactoryInstance}
     * @memberof INailyFactoryImpl
     */
    get<T extends string>(key: T): INailyFactoryInstance;
    /**
     * [EN]
     * ## Get all injectables from the factory
     *
     * ---
     *
     * [ZH]
     * ## 获取工厂中的所有可注入类
     *
     * ---
     *
     * @author Zero <gczgroup@qq.com>
     * @date 2023/10/24
     * @return {INailyFactoryInstance[]}
     * @memberof INailyFactoryImpl
     */
    all(): Map<string, INailyFactory.INailyFactoryInstance>;
    /**
     * [EN]
     * ## Filter injectables from the factory
     * Will return a new Map. The new Map will not affect the original Map.
     *
     * ---
     *
     * [ZH]
     * ## 从工厂中筛选可注入类
     * 将返回一个新的Map。新的Map不会影响原Map。
     *
     * ---
     *
     * @author Zero <gczgroup@qq.com>
     * @date 2023/10/25
     * @param {INailyFactoryFilterOptions} options
     * @return {*}  {Map<string, INailyFactory.INailyFactoryInstance>}
     * @memberof INailyFactoryImpl
     */
    filter(options: INailyFactoryFilterOptions): Map<string, INailyFactory.INailyFactoryInstance>;
    /**
     * [EN]
     * ## Check if the factory has the injectable
     *
     * ---
     *
     * [ZH]
     * ## 检查工厂中是否存在可注入类
     *
     * ---
     *
     * @author Zero <gczgroup@qq.com>
     * @date 2023/10/24
     * @param {string} key The key of the injectable.
     * @return {boolean}
     * @memberof INailyFactoryImpl
     */
    has(key: string): boolean;
    /**
     * [EN]
     * ## Remove a injectable from the factory
     *
     * ---
     *
     * [ZH]
     * ## 从工厂中移除一个可注入类
     *
     * ---
     *
     * @author Zero <gczgroup@qq.com>
     * @date 2023/10/24
     * @param {string} key The key of the injectable.
     * @memberof INailyFactoryImpl
     */
    remove(key: string): void;
    /**
     * [EN]
     * ## Clear all injectables from the factory
     * Not recommended to use, unless you know what you are doing
     *
     * ---
     *
     * [ZH]
     * ## 清除工厂中的所有可注入类
     * 不建议使用，除非你知道你在做什么
     *
     * ---
     *
     * @author Zero <gczgroup@qq.com>
     * @date 2023/10/24
     * @memberof INailyFactoryImpl
     */
    clear(): void;
  }
  export interface INailyFactoryRepository<Context> {
    /**
     * [EN]
     * ## Get a injectable from the factory and take some effect
     *
     * ---
     *
     * [ZH]
     * ## 从工厂中获取一个可注入类并对类进行一些操作
     *
     * ---
     *
     * @author Zero <gczgroup@qq.com>
     * @date 2023/10/25
     * @template T
     * @param {T} key
     * @return {*}  {NailyFactoryRepositoryGetter}
     * @memberof INailyFactoryRepository
     */
    get<T extends string>(key: T): NailyFactoryRepositoryGetter;
    /**
     * [EN]
     * ## Get the factory context
     * The context is the factory itself.
     *
     * ---
     *
     * [ZH]
     * ## 获取工厂上下文
     * 上下文就是工厂本身。
     *
     * ---
     *
     * @author Zero <gczgroup@qq.com>
     * @date 2023/10/25
     * @return {*}  {Context}
     * @memberof INailyFactoryRepository
     */
    getContext(): Context;
  }
}