# 切面

## 简介

切面是一种特殊的 Injectable，它可以在其他模块的基础上进行扩展，而不需要修改原有模块的代码。

## 使用

```typescript
import { Injectable } from "@naily/ioc";
import { Before, After, Aspect, NAopBeforeMeta, NAopAfterMeta } from "@naily/aop";

@Aspect()
class TestService implements $.Impl.Aop.Before, $.Impl.Aop.After {
  // 实现了Before接口 所以可以使用Before装饰器
  beforeExecute(metadata: NAopBeforeMeta) {
    console.log("getHello方法执行前，我就执行了");
  }
  // 实现了After接口，所以可以使用After装饰器
  afterExecute(metadata: NAopAfterMeta) {
    console.log("getHello方法执行后，我才执行");
  }
}

@Injectable()
class BService {
  @Before(TestService) // 在BService类的getHello方法执行前，执行TestService类的afterExecute方法
  @After(TestService) // 在BService类的getHello方法执行后，执行TestService类的beforeExecute方法
  getHello() {
    return "hello world";
  }
}
```

## 限制

- 切面类必须实现`$.Impl.Aop.Before`或者`$.Impl.Aop.After`接口，否则会报错。

## 总结

切面这种设计模式，可以让我们在不修改原有代码的情况下，对原有代码进行扩展，这样就可以实现一些特殊的功能，比如日志、权限等，这些功能都可以通过切面来实现。
