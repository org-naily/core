# @Before <Badge type="tip" text="Method Decorator" />

## 说明

`@Before` 装饰器会修改类的`原型链`，它会在方法执行之前执行。

## 参数

- before: <Badge type="tip" text="Type<INailyBeanBeforeExecute>[]" /> `INailyBeanBeforeExecute` 是一个 interface，它有一个方法 `beforeExecute`，该方法会在方法执行之前执行。

## 使用

```typescript{5}
import { Injectable, Before, INailyBeanBeforeExecute } from "@naily/core";

@Injectable()
export class ListenService implments INailyBeanBeforeExecute {
  beforeExecute() {
    console.log("Before execute");
  }
}

@Injectable()
export class MyService {
  @Before([MyBeforeExecute])
  public myMethod() {
    // ...
  }
};
```

## 注意

- `@Before` 装饰器只能用在 `@Injectable` 类上，并且由 Naily 容器管理以及实例化。
- 如果你手动 new 这个类，`@Before` 装饰器将不会生效。
- 静态(`static`)方法不会生效。
