# @Injectable <Badge type="tip" text="Class Decorator" />

## 说明

使用`@Injectable` 装饰器标记一个类，该类会被添加到 naily 容器。

## 使用

```typescript{3}
import { Injectable } from "@naily/core";

@Injectable()
export class MyService {
  // ...
};
```

## 注意

`@Injectable` 类的构造函数只能有另一个 `@Injectable` 类作为参数。
