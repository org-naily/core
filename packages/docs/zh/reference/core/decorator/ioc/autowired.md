# @Autowired <Badge type="tip" text="Property Decorator" />

## 说明

`@Autowired` 装饰器标记一个类可用于注入依赖项。它是 `@Inject` 的 alia，它和`@Inject`不一样的是它将自动获取属性的类型将其注入进类内。

## 使用

```typescript{6}
import { Injectable, Autowired } from "@naily/core";

@Injectable()
export class MyService {
  // 这会把 MyOtherService 注入到 myOtherService 属性中
  @Autowired
  private readonly myOtherService: MyOtherService
};
```

## 注意

`@Autowired` 装饰器只能用于 `@Injectable` 类中，而且只能注入另一个 `@Injectable` 类。
