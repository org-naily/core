# @Inject <Badge type="tip" text="Property Decorator" />

## 说明

`@Inject` 装饰器会将一个类注入到另一个类中。

## 参数

- inject: <Badge type="tip" text="Type<T>" /> <Badge type="warning" text="必填" /> 要注入的类。

## 使用

```typescript{5}
import { Injectable, Inject } from "@naily/core";

@Injectable()
export class MyService {
  @Inject(MyOtherService)
  private readonly myOtherService: MyOtherService
};
```

## 注意

The `@Inject` decorator only can be used in `@Injectable` class，and only can inject another `@Injectable` class.
