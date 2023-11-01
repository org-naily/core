export class NailyDecoratorFactory {
  public static applyDecorators(...decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator>) {
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

  public static applyClassDecorators(...decorators: Array<ClassDecorator>): ClassDecorator {
    return <TFunction extends Function>(target: TFunction) => {
      for (const decorator of decorators) {
        (decorator as ClassDecorator)(target);
      }
    };
  }

  public static applyMethodDecorators(...decorators: Array<MethodDecorator>): MethodDecorator {
    return <TFunction extends Function>(target: TFunction, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
      for (const decorator of decorators) {
        (decorator as MethodDecorator)(target, propertyKey, descriptor);
      }
    };
  }

  public static applyPropertyDecorators(...decorators: Array<PropertyDecorator>): PropertyDecorator {
    return <TFunction extends Function>(target: TFunction, propertyKey: string | symbol) => {
      for (const decorator of decorators) {
        (decorator as PropertyDecorator)(target, propertyKey);
      }
    };
  }

  public static applyParameterDecorators(...decorators: Array<ParameterDecorator>): ParameterDecorator {
    return <TFunction extends Function>(target: TFunction, propertyKey: string | symbol, parameterIndex: number) => {
      for (const decorator of decorators) {
        (decorator as ParameterDecorator)(target, propertyKey, parameterIndex);
      }
    };
  }
}
