import { INailyBeanAfterExecute, INailyBeanBeforeExecute, INailyBeanContext, INailyBeanContextAfterExecute, Type } from "../typings/common.typing";
import { isClass } from "is-class";
import { WATERMARK } from "../constants/watermark.constant";
import { INailyContainer } from "../typings/container.typing";

export class AbstractNailyDependency {
  private readonly container = new Map<string | symbol, INailyContainer>();

  public getAll() {
    return this.container;
  }

  public add(target: Type) {
    const childrenParameter: Type[] = Reflect.getMetadata("design:paramtypes", target) || [];
    const key: string = Reflect.getMetadata(WATERMARK.INJECTABLE, target);

    const isHaveClass = this.container.get(key);
    if (isHaveClass)
      throw new SyntaxError(
        `Duplicate Naily key "${key}", please check the ${target.name} and ${isHaveClass.target.name} classes injectable key and make sure they are different`
      );
    const parsed = this.parseParameter(childrenParameter);
    const newed = new target(...parsed);
    this.parseInject(target, newed);
    this.parseAspect(target, newed, key);

    this.container.set(key, {
      target: target,
      newed: newed,
    });
  }

  public findOneByKey(key: string) {
    return this.container.get(key);
  }

  public findOneByTarget<T>(target: Type): INailyContainer<T>;
  public findOneByTarget(target: Type) {
    const key: string | undefined = Reflect.getMetadata(WATERMARK.INJECTABLE, target);
    return this.container.get(key);
  }

  protected parseParameter(param: Type[]): object[] {
    const result: object[] = [];
    for (let i = 0; i < param.length; i++) {
      if (!isClass(param[i])) throw new TypeError("Parameter must be a class");
      const childrenParameter: Type[] = Reflect.getMetadata("design:paramtypes", param[i]) || [];
      const parsed = this.parseParameter(childrenParameter);
      result.push(new param[i](...parsed));
    }
    return result;
  }

  /**
   * Parse before execute bean
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/15
   * @private
   * @param {Type[]} befores
   * @param {INailyBeanContext} context
   * @memberof AbstractNailyDependency
   */
  private async parseBeforeExecute(befores: Type[], context: INailyBeanContext) {
    for (let i = 0; i < befores.length; i++) {
      const before = befores[i];
      const beforeInstance = this.findOneByTarget<INailyBeanBeforeExecute>(before);
      if (!beforeInstance) throw new Error("Before instance not found in Naily container");
      if (beforeInstance.newed.beforeExecute) {
        await beforeInstance.newed.beforeExecute(context);
      }
    }
  }

  /**
   * Parse after execute bean
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2023/10/15
   * @private
   * @param {Type[]} afters
   * @param {INailyBeanContextAfterExecute} context
   * @memberof AbstractNailyDependency
   */
  private async parseAfterExecute(afters: Type[], context: INailyBeanContextAfterExecute) {
    for (let i = 0; i < afters.length; i++) {
      const after = afters[i];
      const afterInstance = this.findOneByTarget<INailyBeanAfterExecute>(after);
      if (!afterInstance) throw new TypeError("After instance not found in Naily container");
      if (afterInstance.newed.afterExecute) {
        await afterInstance.newed.afterExecute(context);
      }
    }
  }

  protected parseAspect(target: Type, newed: object, key: string) {
    const propertyMethods: (string | symbol)[] = Reflect.ownKeys(target.prototype).filter((item) => item !== "constructor");

    // 遍历所有方法键值
    for (let i = 0; i < propertyMethods.length; i++) {
      const item = propertyMethods[i];
      // 获取到此方法的前置方法和后置方法
      const befores: Type[] = Reflect.getMetadata(WATERMARK.BEFORE_EXECUTE, target.prototype, item) || [];
      const afters: Type[] = Reflect.getMetadata(WATERMARK.AFTER_EXECUTE, target.prototype, item) || [];
      // 先把原始方法保存起来 等待后续调用
      const originalMethod: Function = target.prototype[item];
      if (typeof originalMethod !== "function") continue;

      // 重写原始方法
      target.prototype[item] = (...args: any[]) => {
        // 上下文
        const context: INailyBeanContext = {
          getArgs: () => args,
          getClass: () => target,
          getNewed: () => newed,
          getNailyKey: () => key,
        };

        // 执行前置方法
        this.parseBeforeExecute(befores, context);

        // 执行原始方法 必须要call 否则this指向会出问题 不会绑定到newed上
        const result = originalMethod.call(newed, ...args);

        // 执行后置方法
        this.parseAfterExecute(afters, {
          ...context,
          getReturnValue: () => result,
        });

        // 返回原始方法的结果
        return result;
      };
    }
  }

  protected parseInject(target: Type, newed: object) {
    const propertyMethods: (string | symbol)[] = Reflect.ownKeys(target.prototype).filter((item) => item !== "constructor");
    propertyMethods.forEach((item) => {
      const val = Reflect.getMetadata(WATERMARK.INJECT, target.prototype, item);
      if (!val) return;
      const info = this.findOneByTarget(val);
      if (!info) throw new Error("Inject instance not found in Naily container");
      newed[item] = info.newed;
    });
  }
}

export const NailyDependency = new AbstractNailyDependency();
