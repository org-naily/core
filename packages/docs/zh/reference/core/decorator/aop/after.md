# @After <Badge type="tip" text="Method Decorator" />

## 说明

zh: `@After` 装饰器会修改类的`原型链`，它会在方法执行之后执行。

## 参数

- after: <Badge type="tip" text="Type<INailyBeanAfterExecute>[]" /> 接口`INailyBeanAfterExecute` 有一个方法 `afterExecute`，该方法会在方法执行之后执行。

## 使用

```typescript{5}
import { Injectable, After, INailyBeanAfterExecute } from "@naily/core";

@Injectable()
export class ListenService implments INailyBeanAfterExecute {
  afterExecute() {
    console.log("After execute");
  }
}

@Injectable()
export class MyService {
  @After([MyAfterExecute])
  public myMethod() {
    // ...
  }
};
```

## 注意

- The `@After` decorator only can be used in `@Injectable` class，if you manual to new the class, the `@After` decorator will `not work`.
- Static method will `not work` with `@After` decorator.
