/*
 * @Author: Zero的Mac 1203970284@qq.com
 * @Date: 2023-09-25 01:42:30
 * @LastEditors: Zero的Mac 1203970284@qq.com
 * @LastEditTime: 2023-09-25 01:42:32
 * @FilePath: /v5/packages/core/utils/applyDecorator.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

export function applyDecorators(...decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator>) {
  return <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => {
    for (const decorator of decorators) {
      if (target instanceof Function && !descriptor) {
        (decorator as ClassDecorator)(target);
        continue;
      }
      (decorator as MethodDecorator | PropertyDecorator)(target, propertyKey, descriptor);
    }
  };
}
